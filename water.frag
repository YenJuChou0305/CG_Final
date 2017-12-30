#version 330 core

in vec4 clipSpace;
in vec2 textureCoords;

out vec4 out_Color;

uniform sampler2D reflectionTexture;
uniform sampler2D refractionTexture;
uniform sampler2D dudvMap;

uniform float moveFactor;

const float waveStrength = 0.02;


void main(void) 
{
    
    vec2 ndc = (clipSpace.xy / clipSpace.w) / 2.0 + 0.5;
    vec2 reflectTexCoords = vec2(ndc.x, -ndc.y);
    vec2 refractTexCoords = vec2(ndc.x, ndc.y);

	vec2 distort1 = ( texture(dudvMap, vec2(textureCoords.x + moveFactor, textureCoords.y)).rg * 2 - 1 ) * waveStrength;
	vec2 distort2 = ( texture(dudvMap, vec2(-textureCoords.x + moveFactor, textureCoords.y + moveFactor)).rg * 2 - 1 ) * waveStrength;
	vec2 totalDistortion = distort1 + distort2;

	reflectTexCoords += totalDistortion;
	reflectTexCoords.x = clamp(reflectTexCoords.x, 0.001, 0.999);
	reflectTexCoords.y = clamp(reflectTexCoords.y, -0.999, -0.001);

	refractTexCoords += totalDistortion;
	refractTexCoords = clamp(refractTexCoords, 0.001, 0.999);
    
    vec4 reflectColor = texture(reflectionTexture, reflectTexCoords );
    vec4 refractColor = texture(refractionTexture, refractTexCoords );

    out_Color = mix(reflectColor, refractColor, 0.5);
	out_Color = mix(out_Color, vec4(0, 0.3, 0.5, 1), 0.2);
}
