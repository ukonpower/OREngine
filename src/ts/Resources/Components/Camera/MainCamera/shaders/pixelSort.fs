#include <common>
precision highp int;
uniform sampler2D backbuffer0;
uniform sampler2D uMaskTex;
uniform sampler2D uRangeTex;
uniform vec2 uPPResolution;
uniform float uBlock;
uniform float uSubBlock;
uniform float uTime;

layout (location = 0) out vec4 outColor;

in vec2 vUv;

float grayScale(vec3 color) {
    return dot(color, vec3(0.2126, 0.7152, 0.0722));
}

bool ordering = true;

void main(void) {

    // meta
    
    vec4 meta = texture( uRangeTex, vUv );
    float metaRangeStart = meta.x;
    float metaRangeLength = meta.y;

    // calc coord

    float coord = vUv.y * uPPResolution.y;
    float coordOffset = coord - metaRangeStart;

    int blockIndex = int( uBlock );
    int subBlockIndex = int( uSubBlock );
    float d = float( 1 << ( blockIndex - subBlockIndex ) );
    bool up = ( ( int( coordOffset ) >> blockIndex ) & 2 ) == 0;
    bool compareDir = ( ( int( coordOffset ) >> ( blockIndex - subBlockIndex ) ) & 1 ) == 0;

    int blockSize = 1 << ( int( uBlock ) + 1 );
    int endBlock = int( metaRangeLength ) / blockSize;
    bool ascPattern = ( endBlock % 2 == 0 ) == ordering;

    bool swapDir = up == compareDir;
    swapDir = swapDir == ascPattern;

    // target coord

    float targetOffset = float( compareDir ? d : - d );
    float coordTargetOffset = coordOffset + targetOffset;
    float coordTarget = coord + targetOffset;

    // fetch color texture

    vec4 currentPixel = texture(backbuffer0, vUv);
    vec4 currentMaskValue = texture(uMaskTex, vUv);

    vec2 targetUv = vec2( vUv.x, coordTarget / uPPResolution.y );
    vec4 targetPixel = texture(backbuffer0, targetUv );
    vec4 targetMaskValue = texture(uMaskTex, targetUv );

    // mask

    if (currentMaskValue.x == 0.0 || targetMaskValue.x == 0.0 ) {

        outColor = currentPixel;

        return;

    }

    // out of range

    if( coordTargetOffset > metaRangeLength ) {

        outColor = swapDir ? currentPixel : targetPixel;

        return;

    }

    // compare

    float currentValue = grayScale(currentPixel.xyz);
    float targetValue = grayScale(targetPixel.xyz);

    bool shouldSwap = swapDir == (currentValue > targetValue);

    outColor = shouldSwap ? targetPixel : currentPixel;

}