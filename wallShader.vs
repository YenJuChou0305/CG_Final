#version 330 core
layout (location = 0) in vec3 aPos;
layout (location = 1) in vec2 aTexCoord;

out vec2 textureCoords;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

//const vec4 plane = vec4(0, -1, 0, 0);
uniform vec4 plane;

void main()
{
    gl_Position = projection * view * model * vec4(aPos, 1.0);

	//gl_ClipDistance[0] = dot(gl_Position, plane);
	gl_ClipDistance[0] = dot(vec4(aPos, 1.0), plane);

    textureCoords = aTexCoord;
}
