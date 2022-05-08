uniform float uTime;
uniform sampler2D uTexture;
varying vec3 vPos;

varying vec2 vUv;
varying float vAlpha;

void main()
{
    vec4 color = texture2D(uTexture, vUv);
     vec3 pink = vec3(0.8, 0, 0.5);
    vec3 final = mix(vec3(1.), pink, 1.-color.r); 
    float opacity = smoothstep(0.5, 1., length(vPos.xyz));
    gl_FragColor = vec4(final, vAlpha*opacity*0.3);
}