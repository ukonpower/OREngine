import { describe, it, expect, vi } from 'vitest';

vi.mock('../packages/maxpower/Utils/ShaderParser/shaderModules/common.module.glsl', () => ({ default: '' }));
vi.mock('../packages/maxpower/Utils/ShaderParser/shaderModules/light.module.glsl', () => ({ default: '' }));
vi.mock('../packages/maxpower/Utils/ShaderParser/shaderModules/noiseCyclic.module.glsl', () => ({ default: '' }));
vi.mock('../packages/maxpower/Utils/ShaderParser/shaderModules/noiseSimplex.module.glsl', () => ({ default: '' }));
vi.mock('../packages/maxpower/Utils/ShaderParser/shaderModules/noiseValue.module.glsl', () => ({ default: '' }));
vi.mock('../packages/maxpower/Utils/ShaderParser/shaderModules/pmrem.module.glsl', () => ({ default: '' }));
vi.mock('../packages/maxpower/Utils/ShaderParser/shaderModules/random.module.glsl', () => ({ default: 'float random(vec2 p){return 0.;}' }));
vi.mock('../packages/maxpower/Utils/ShaderParser/shaderModules/raymarch_normal.module.glsl', () => ({ default: '' }));
vi.mock('../packages/maxpower/Utils/ShaderParser/shaderModules/rotate.module.glsl', () => ({ default: '' }));
vi.mock('../packages/maxpower/Utils/ShaderParser/shaderModules/sdf.module.glsl', () => ({ default: '' }));
vi.mock('../packages/maxpower/Utils/ShaderParser/shaderParts/frag_h.part.glsl', () => ({ default: '' }));
vi.mock('../packages/maxpower/Utils/ShaderParser/shaderParts/frag_in.part.glsl', () => ({ default: '' }));
vi.mock('../packages/maxpower/Utils/ShaderParser/shaderParts/frag_out.part.glsl', () => ({ default: '' }));
vi.mock('../packages/maxpower/Utils/ShaderParser/shaderParts/lighting_env.part.glsl', () => ({ default: '' }));
vi.mock('../packages/maxpower/Utils/ShaderParser/shaderParts/lighting_forwardIn.part.glsl', () => ({ default: '' }));
vi.mock('../packages/maxpower/Utils/ShaderParser/shaderParts/lighting_light.part.glsl', () => ({ default: '' }));
vi.mock('../packages/maxpower/Utils/ShaderParser/shaderParts/raymarch_h.part.glsl', () => ({ default: '' }));
vi.mock('../packages/maxpower/Utils/ShaderParser/shaderParts/raymarch_out_obj.part.glsl', () => ({ default: '' }));
vi.mock('../packages/maxpower/Utils/ShaderParser/shaderParts/raymarch_ray_object.part.glsl', () => ({ default: '' }));
vi.mock('../packages/maxpower/Utils/ShaderParser/shaderParts/raymarch_ray_world.part.glsl', () => ({ default: '' }));
vi.mock('../packages/maxpower/Utils/ShaderParser/shaderParts/uniform_time.part.glsl', () => ({ default: '' }));
vi.mock('../packages/maxpower/Utils/ShaderParser/shaderParts/vert_h.part.glsl', () => ({ default: '' }));
vi.mock('../packages/maxpower/Utils/ShaderParser/shaderParts/vert_in.part.glsl', () => ({ default: '' }));
vi.mock('../packages/maxpower/Utils/ShaderParser/shaderParts/vert_out.part.glsl', () => ({ default: '' }));

import { shaderInsertDefines, shaderInclude } from '../packages/maxpower/Utils/ShaderParser';

describe('ShaderParser helpers', () => {
  it('shaderInsertDefines prepends defines', () => {
    const shader = 'void main(){}';
    const res = shaderInsertDefines(shader, { FOO: 1, BAR: 'true' });
    expect(res.startsWith('#define FOO 1\n#define BAR true\n')).toBe(true);
    expect(res.endsWith(shader)).toBe(true);
  });

  it('shaderInclude replaces include directives', () => {
    const shader = '#include <random>'; // random.module.glsl exports function random
    const res = shaderInclude(shader);
    expect(res).toContain('float random');
    expect(res).not.toMatch(/#include/);
  });
});
