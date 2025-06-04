vec3 N( vec3 pos, float delta ){

    return normalize( vec3(
		D( vec3( pos.x + delta, pos.y, pos.z ) ).d - D( vec3( pos.x - delta, pos.y, pos.z ) ).d,
		D( vec3( pos.x, pos.y + delta, pos.z ) ).d - D( vec3( pos.x, pos.y - delta, pos.z ) ).d,
		D( vec3( pos.x, pos.y, pos.z + delta ) ).d - D( vec3( pos.x, pos.y, pos.z - delta ) ).d
	) );
	
}