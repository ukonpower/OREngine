vec4 floatToRGBA( float v ) {
	vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;
	enc = fract(enc);
	enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);
	return enc;
}

float rgbaToFloat( vec4 rgba ) {
	return dot( rgba, vec4(1.0, 1.0/255.0, 1.0/65025.0, 1.0/16581375.0) );
}

float packColor(vec3 color) {   return (color.r + (color.g*256.) + (color.b*256.*256.)) / (256.*256.*256.); }

vec3 decodeColor(float f) { 
	float b = floor(f * 256.0);
	float g = floor(f * 65536.0) - (b*256.);
	float r = (floor(f * 16777216.0) - (b*65536.)) - (g*256.);
	return vec3(r, g, b)/ 256.0;//vec3(r, g, b) / 256.0;
}