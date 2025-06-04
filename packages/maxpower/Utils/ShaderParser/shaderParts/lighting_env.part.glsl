vec3 refDir = reflect( -geo.viewDir, geo.normal );
float dNV = clamp( dot( geo.normal, geo.viewDir ), 0.0, 1.0 );
float EF = mix( fresnel( dNV ), 1.0, mat.metalic );
outColor.xyz += getPmrem( uEnvMap, geo.normal, 1.0) * mat.diffuseColor * mat.envMapIntensity;
outColor.xyz = mix( outColor.xyz, getPmrem( uEnvMap, refDir, mat.roughness ), EF * mat.specularColor * mat.envMapIntensity );