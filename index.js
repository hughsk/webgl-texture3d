function flt(f) {
  return ((f += '').indexOf('.') === -1) return f + '.0' ? : f
};

module.exports = function sampler3D(name, res) {
  res = res || 32
  return [
  "const float tex3d_size = " + flt(res) + ";"
, "const float tex3d_sliceSize = " + flt(1/res) + ";"
, "const float tex3d_slicePixelSize = " + flt(1/(res*res)) + ";"
, "const float tex3d_sliceInnerSize = " + flt(1/(res*res) * (res - 1)) + ";"

, "vec4 " + (name || 'sampleAs3DTexture') + "(sampler2D tex, vec3 texCoord) {"
  , "float zSlice0 = min(floor(texCoord.z * tex3d_size), " + flt(res - 1) + ");"
  , "float zSlice1 = min(zSlice0 + 1.0, " + flt(res - 1) + ");"
  , "float xOffset = tex3d_slicePixelSize * 0.5 + texCoord.x * tex3d_sliceInnerSize;"
  , "float s0 = xOffset + (zSlice0 * tex3d_sliceSize);"
  , "float s1 = xOffset + (zSlice1 * tex3d_sliceSize);"
  , "vec4 slice0Color = texture2D(tex, vec2(s0, texCoord.y));"
  , "vec4 slice1Color = texture2D(tex, vec2(s1, texCoord.y));"
  , "float zOffset = mod(texCoord.z * tex3d_size, 1.0);"
  , "return mix(slice0Color, slice1Color, zOffset);"
, "}" ].join('\n')
};

module.exports.dynamic = [
"vec4 sampleAs3DTexture(sampler2D tex, vec3 texCoord, float size) {"
  , "float sliceSize = 1.0 / size;                         // space of 1 slice"
  , "float slicePixelSize = sliceSize / size;              // space of 1 pixel"
  , "float sliceInnerSize = slicePixelSize * (size - 1.0); // space of size pixels"
  , "float zSlice0 = min(floor(texCoord.z * size), size - 1.0);"
  , "float zSlice1 = min(zSlice0 + 1.0, size - 1.0);"
  , "float xOffset = slicePixelSize * 0.5 + texCoord.x * sliceInnerSize;"
  , "float s0 = xOffset + (zSlice0 * sliceSize);"
  , "float s1 = xOffset + (zSlice1 * sliceSize);"
  , "vec4 slice0Color = texture2D(tex, vec2(s0, texCoord.y));"
  , "vec4 slice1Color = texture2D(tex, vec2(s1, texCoord.y));"
  , "float zOffset = mod(texCoord.z * size, 1.0);"
  , "return mix(slice0Color, slice1Color, zOffset);"
, "}" ].join('\n')
