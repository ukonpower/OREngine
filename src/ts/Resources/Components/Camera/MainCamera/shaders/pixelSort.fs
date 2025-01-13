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

float grayScale( vec3 color ) {
    return 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;
}

void main(void) {

    // meta
    
    vec4 meta = texelFetch( uRangeTex, ivec2( gl_FragCoord.xy ), 0 );
    float metaStartPixel = meta.x; // ソート範囲の開始位置
    float metaEndPixel = meta.y;   // ソート範囲の終了位置
    float metaRangeLength = meta.z; // ソート範囲の長さ
    
    // calc coord

    float coordY = gl_FragCoord.y;
    float coordYoffset = coordY - metaStartPixel;

    int p = int(uBlock);
    int q = int(uSubBlock);
    int d = 1 << (p-q);
    bool up = ((int(coordYoffset) >> p) & int(2)) == 0;
    bool compareDir = ((int(coordYoffset) >> (p - q)) & int(1)) == 0;

    float coordYTargetOffset = coordYoffset + float(compareDir ? d : - d);
    float corrdYTarget = coordY + float(compareDir ? d : - d);

    // current, target
    
    vec4 currentPixel = texture(backbuffer0, vUv );
    vec4 currentMaskValue = texture( uMaskTex, vUv );

    vec4 targetPixel = texture( backbuffer0, vec2( gl_FragCoord.x, corrdYTarget ) / uPPResolution );
    vec4 targetMaskValue = texture( uMaskTex, vec2( gl_FragCoord.x, corrdYTarget ) / uPPResolution );

    // mask
    
    if( currentMaskValue.x == 0.0 || targetMaskValue.x == 0.0 ) {
        outColor = currentPixel;
        return;
    }
    
    // range
    
    if( coordYTargetOffset > metaRangeLength ) {
        outColor = currentPixel;
        return;   
    }

    // swap

    float currentValue = grayScale( currentPixel.xyz );
    float targetValue = grayScale( targetPixel.xyz );

    bool shouldSwap = (up == compareDir)
        ? (currentValue > targetValue)
        : (currentValue < targetValue);

    outColor = shouldSwap ? targetPixel : currentPixel;
    
}
