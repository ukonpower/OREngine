#version 300 es

precision highp float;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform float uSplatSize;

// ガウシアンスプラットの属性
in vec3 position;
in vec3 scale;
in vec4 rotation;
in vec3 color;
in float alpha;

// 出力用変数
out vec3 vColor;
out float vAlpha;
out vec3 vScale;
out vec4 vRotation;

void main() {
    // モデル座標系からワールド座標系への変換
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    
    // ビュー座標系への変換
    vec4 viewPosition = viewMatrix * worldPosition;
    
    // 射影変換
    gl_Position = projectionMatrix * viewPosition;
    
    // スプラットのサイズに基づいてポイントサイズを設定
    gl_PointSize = uSplatSize;
    
    // フラグメントシェーダーに送る変数
    vColor = color;
    vAlpha = alpha;
    vScale = scale;
    vRotation = rotation;
} 