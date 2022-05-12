varying vec3 pos;
uniform float u_time;
void main() {
    if (pos.x >= 0.0) {
        // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        gl_FragColor = vec4(abs(sin(u_time)), 0.0, 0.0, 1.0);
    } else {
        // gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
        gl_FragColor = vec4(0.0, abs(cos(u_time)), 0.0, 1.0);
    }
}
