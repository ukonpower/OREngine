vec3 refDir = reflect( -geo.viewDir, geo.normal );
float dNV = clamp( dot( geo.normal, geo.viewDir ), 0.0, 1.0 );
float EF = mix( fresnel( dNV ), 1.0, mat.metallic );

// 環境の鏡面反射に置き換わる割合。直接光も含め diffuse / specular を同じ割合で減らす
vec3 envReflect = EF * mat.specularColor * mat.envMapIntensity;

diffuse = ( diffuse + getPmrem( uEnvMap, geo.normal, 1.0 ) * mat.diffuseColor * mat.envMapIntensity ) * ( 1.0 - envReflect );
specular = mix( specular, getPmrem( uEnvMap, refDir, mat.roughness ), envReflect );