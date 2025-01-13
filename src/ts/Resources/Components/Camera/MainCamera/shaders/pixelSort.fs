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
    vec4 currentPixel = texture(backbuffer0, vUv);
    float currentValue = grayScale( currentPixel.xyz );
    vec4 currentMaskCol = texture( uMaskTex, vUv );

    vec4 rangeCol = texture( uRangeTex, vUv );
	
    float startPixel = rangeCol.x; // ソート範囲の開始位置
    float endPixel = rangeCol.y;   // ソート範囲の終了位置

    // // 現在のピクセルのy座標が範囲外の場合、そのまま出力
	
    // if (gl_FragCoord.y < startPixel || gl_FragCoord.y > endPixel) {
    //     outColor = currentPixel;
    //     return;
    // }

    float offsetPixel = rangeCol.x;

    vec2 coord = gl_FragCoord.xy;
    coord.y -= offsetPixel;

    int p = int(uBlock);
    int q = int(uSubBlock);

    int d = 1 << (p-q);

    bool up = ((int(coord.y) >> p) & int(2)) == 0;
    bool compareDir = ((int(coord.y) >> (p - q)) & int(1)) == 0;

    float targetIndex = (coord.y) + float(compareDir ? d : - d);
    float targetIndexOffset = (targetIndex + offsetPixel);
    vec2 targetUV = vec2( vUv.x, targetIndexOffset / uPPResolution.y);

    vec4 targetPixel = texture(backbuffer0, targetUV);
    float targetValue = grayScale( targetPixel.xyz );
    vec4 targetMaskValue = texture( uMaskTex, targetUV );

    // マスクが無効な場合はそのまま出力
    if( currentMaskCol.x == 0.0 || targetMaskValue.x == 0.0 ) {
        outColor = currentPixel;
        return;
    }

    bool shouldSwap = (up == compareDir)
        ? (currentValue < targetValue)
        : (currentValue > targetValue);

    outColor = shouldSwap ? targetPixel : currentPixel;

    // デバッグ用のアウトプット
    // outColor = vec4( vec3( compareDir ), 1.0 );
}
