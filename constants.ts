import { StyleDefinition, Translation, Language } from './types';

export const TRANSLATIONS: Record<Language, Translation> = {
  cn: {
    title: "AI 智能写真馆",
    subtitle: "上传一张照片，立刻生成 6 种不同风格的高质感写真",
    uploadButton: "上传照片",
    uploadHint: "支持 JPG, PNG 格式",
    processing: "正在生成中...",
    regenerate: "重新生成",
    download: "下载",
    errorGeneric: "生成失败，请重试",
    selectPhoto: "选择一张人像照片",
    styles: {
      professional: "职业形象",
      cyberpunk: "赛博朋克",
      vintage: "复古胶片",
      bw: "黑白影棚",
      nature: "自然清新",
      oil: "艺术油画"
    }
  },
  en: {
    title: "AI Portrait Studio",
    subtitle: "Upload one photo, instantly generate 6 high-quality portraits styles",
    uploadButton: "Upload Photo",
    uploadHint: "Supports JPG, PNG",
    processing: "Generating...",
    regenerate: "Regenerate",
    download: "Download",
    errorGeneric: "Generation failed",
    selectPhoto: "Select a portrait photo",
    styles: {
      professional: "Professional",
      cyberpunk: "Cyberpunk",
      vintage: "Vintage Film",
      bw: "Studio B&W",
      nature: "Nature",
      oil: "Oil Painting"
    }
  }
};

// Prompts are designed to be appended to the user's image
// The first prompt is exactly as requested by the user.
export const STYLES: StyleDefinition[] = [
  {
    id: 'professional',
    nameEn: 'Professional Headshot',
    nameCn: '职业肖像照',
    icon: 'briefcase',
    promptCn: "专业商务肖像风格。镜头：中景（Medium Shot），平视视角。光线：专业影棚柔光箱照明（Softbox Lighting），面部光线均匀、立体，眼神有光。背景：模糊的高级灰色调办公空间或纯色质感背景，突显主体。风格：高清晰度，色彩还原准确，肤色自然，衣着质感清晰，展现自信、稳重、专业的形象，适合LinkedIn头像。",
    promptEn: "Professional business portrait style. Lens: Medium Shot, eye-level angle. Lighting: Professional studio softbox lighting, even and dimensional facial lighting with catchlights in eyes. Background: Blurred premium grey-toned office space or solid textured backdrop to highlight the subject. Style: High definition, accurate color reproduction, natural skin tones, clear clothing texture, projecting confidence, stability, and professionalism, suitable for LinkedIn headshots."
  },
  {
    id: 'cyberpunk',
    nameEn: 'Cyberpunk Neon',
    nameCn: '赛博朋克霓虹',
    icon: 'zap',
    promptCn: "赛博朋克未来风格。镜头：面部特写（Close-up），浅景深。光线：强烈的霓虹色侧逆光（Rim Light），青色和洋红色的双色布光，面部有环境光反射。背景：雨夜中模糊的未来城市街道，霓虹招牌光斑。风格：高对比度，电影级调色，湿润的质感，充满科技感和神秘氛围。",
    promptEn: "Cyberpunk futuristic style. Lens: Face Close-up, shallow depth of field. Lighting: Strong neon rim light, dual-color lighting with cyan and magenta, ambient light reflections on the face. Background: Blurred futuristic city streets in a rainy night with neon sign bokeh. Style: High contrast, cinematic color grading, wet texture, full of high-tech and mysterious atmosphere."
  },
  {
    id: 'vintage',
    nameEn: 'Vintage Film',
    nameCn: '复古胶片感',
    icon: 'camera',
    promptCn: "90年代复古胶片摄影风格。镜头：中近景（Medium Close-up），略微仰视。光线：温暖的午后自然侧光，柔和且带有暖调。背景：充满生活气息的复古室内一角或阳光斑驳的街道，细节丰富。风格：模拟柯达Portra 400胶卷质感，明显的颗粒感（Film Grain），色彩浓郁复古，略带褪色效果，充满故事感和怀旧情绪。",
    promptEn: "90s vintage film photography style. Lens: Medium Close-up, slight low angle. Lighting: Warm afternoon natural side light, soft and warm-toned. Background: A corner of a vintage interior full of life or a sun-dappled street with rich details. Style: Mimics Kodak Portra 400 film texture, visible film grain, rich vintage colors, slight fading effect, full of storytelling and nostalgic emotion."
  },
  {
    id: 'bw',
    nameEn: 'Studio B&W',
    nameCn: '黑白艺术',
    icon: 'moon',
    promptCn: "经典黑白艺术肖像。镜头：半身肖像（Portrait Shot）。光线：戏剧性的伦勃朗光（Rembrandt Lighting），创造强烈的明暗对比，突出面部轮廓。背景：纯黑色深邃背景，零干扰。风格：极简主义，高反差黑白，强调皮肤纹理和眼神光，去除色彩干扰，直击灵魂，具有永恒的艺术雕塑感。",
    promptEn: "Classic black and white art portrait. Lens: Portrait Shot (half-body). Lighting: Dramatic Rembrandt lighting, creating strong chiaroscuro contrast to highlight facial contours. Background: Pure deep black background, zero distraction. Style: Minimalist, high-contrast B&W, emphasizing skin texture and eye catchlights, removing color distractions to focus on the soul, possessing a timeless artistic sculptural quality."
  },
  {
    id: 'nature',
    nameEn: 'Nature Lifestyle',
    nameCn: '自然生活',
    icon: 'sun',
    promptCn: "清新自然的生活方式摄影。镜头：中景（Medium Shot），大光圈虚化。光线：黄金时刻（Golden Hour）的逆光，阳光在发丝边缘形成金色轮廓，面部光线通透。背景：户外的森林、公园或草地，背景是梦幻的绿色植被光斑（Bokeh）。风格：日系空气感，低对比度，色彩清新淡雅，曝光略微过曝，展现轻松、愉悦、充满活力的氛围。",
    promptEn: "Fresh and natural lifestyle photography. Lens: Medium Shot, wide aperture bokeh. Lighting: Backlight during Golden Hour, sunlight creating a golden contour on hair edges, transparent facial lighting. Background: Outdoor forest, park, or meadow, with dreamy green vegetation bokeh. Style: Japanese airy aesthetic, low contrast, fresh and pastel colors, slightly overexposed, showing a relaxed, joyful, and vibrant atmosphere."
  },
  {
    id: 'oil',
    nameEn: 'Oil Painting',
    nameCn: '古典油画',
    icon: 'palette',
    promptCn: "古典主义油画风格。镜头：传统的肖像构图（Classic Portrait Composition）。光线：柔和的窗边光或烛光效果，营造静谧氛围。背景：抽象的深棕色或暗红色油画肌理背景。风格：厚涂法（Impasto）笔触清晰可见，色彩层叠丰富，质感细腻油润。画面具有画布纹理，模仿文艺复兴时期或印象派大师的画作风格，艺术性极强。",
    promptEn: "Classicalism oil painting style. Lens: Classic Portrait Composition. Lighting: Soft window light or candlelight effect, creating a serene atmosphere. Background: Abstract dark brown or dark red oil painting textured background. Style: Visible Impasto brushstrokes, rich color layering, delicate and oily texture. Image features canvas texture, mimicking Renaissance or Impressionist master styles, highly artistic."
  }
];
