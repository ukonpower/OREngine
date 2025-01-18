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
    
    vec4 meta = texelFetch(uRangeTex, ivec2(gl_FragCoord.xy), 0);
    float metaRangeStart = meta.x;
    float metaRangeLength = meta.z;
    float metaRangeLengthPot = meta.w;

    // calc coord

    float coordY = gl_FragCoord.y;
    float coordYoffset = coordY - metaRangeStart;

    int p = int(uBlock);
    int q = int(uSubBlock);
    float d = float( 1 << ( p - q ) );
    bool up = ( ( int( coordYoffset ) >> p ) & 2) == 0;
    bool compareDir = ( ( int( coordYoffset ) >> ( p - q ) ) & 1 ) == 0;

    int blockSize = 1 << (int(uBlock) + 1);
    int endBlock = int(metaRangeLength) / blockSize;
    bool ascPattern = (endBlock % 2 == 0) == ordering;  // ソートの昇順/降順パターン

    float targetOffset = float( compareDir ? d : -d );
    float coordYTargetOffset = coordYoffset + targetOffset;
    float coordYTarget = coordY + targetOffset;

    // fetch color texture

    vec4 currentPixel = texture(backbuffer0, vUv);
    vec4 currentMaskValue = texture(uMaskTex, vUv);

    vec2 targetUv = vec2(vUv.x, coordYTarget / uPPResolution.y);
    vec4 targetPixel = texture(backbuffer0, targetUv );
    vec4 targetMaskValue = texture(uMaskTex, targetUv );

    // mask / range

    if (currentMaskValue.x == 0.0 || targetMaskValue.x == 0.0 ) {
        outColor = currentPixel;
        return;
    }

    bool swapDir = (up == compareDir);
    swapDir = swapDir == ascPattern;

    if( coordYTargetOffset > metaRangeLength ) {

        targetPixel = vec4( swapDir ? 1.0 : 0.0 );

    }

    // compare swap

    float currentValue = grayScale(currentPixel.xyz);
    float targetValue = grayScale(targetPixel.xyz);


    bool shouldSwap = swapDir ? (currentValue > targetValue) : (currentValue < targetValue);

    outColor = shouldSwap ? targetPixel : currentPixel;
}