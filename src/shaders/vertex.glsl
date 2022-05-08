uniform float uTime; 

varying vec3 vPos;
varying vec2 vUv;
varying float vAlpha;

attribute vec3 translate;
attribute float aRotate;

mat4 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    
    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                0.0,                                0.0,                                0.0,                                1.0);
}

vec3 rotate(vec3 v, vec3 axis, float angle) {
	mat4 m = rotationMatrix(axis, angle);
	return (m * vec4(v, 1.0)).xyz;
}

void main()
{
    // vec4 mvPosition=modelViewMatrix*vec4(position,1.);
    // gl_PointSize=100.*(1./-mvPosition.z);
    float depth = 5.0;
   


    vec3 newpos = position ;
    newpos = rotate(newpos, vec3(0.0, 0.0, 1.0), aRotate);
    newpos += translate;
    newpos.z = -mod(newpos.z-uTime, 5.);
    vPos = newpos;
    vAlpha = smoothstep(-5.+3., -4., newpos.z);

    gl_Position=projectionMatrix*modelViewMatrix*vec4(newpos,1.);
    
    vUv=uv;
}