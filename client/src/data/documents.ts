export interface Document {
  id: string;
  title: string;
  filename: string;
  category: string;
  phase: number;
  type: 'research' | 'feynman' | 'concept-card' | 'quiz' | 'practice' | 'summary' | 'guide';
  size: number;
  tags: string[];
  description: string;
  priority: number; // 1-5, 5 is highest
}

export const documents: Document[] = [
  // 第一阶段：拆解阶段
  {
    id: 'palantir-shipos-research',
    title: 'Palantir_ShipOS_研究报告',
    filename: 'Palantir_ShipOS_研究报告.md',
    category: '基础研究',
    phase: 1,
    type: 'research',
    size: 19974,
    tags: ['Palantir概况', 'ShipOS', '核心产品', '行业解决方案'],
    description: 'Palantir 公司概况、核心产品介绍和 ShipOS 详解',
    priority: 4
  },
  {
    id: 'palantir-system-collaboration',
    title: 'Palantir系统协作关系与实施路径',
    filename: 'Palantir系统协作关系与实施路径.md',
    category: '系统架构',
    phase: 1,
    type: 'research',
    size: 27635,
    tags: ['系统架构', 'Ontology', 'Foundry', 'AIP', '实施路径'],
    description: 'Palantir 核心系统协作关系、Ontology 组成部分和实施路径',
    priority: 5
  },
  {
    id: 'palantir-product-system',
    title: 'Palantir产品体系深度解析',
    filename: 'Palantir产品体系深度解析.md',
    category: '产品体系',
    phase: 1,
    type: 'research',
    size: 19213,
    tags: ['产品定位', '商业模式', '产品vs解决方案'],
    description: 'Palantir 四层产品架构和产品 vs 解决方案的判断标准',
    priority: 4
  },
  {
    id: 'palantir-learning-methodology',
    title: 'Palantir学习方法论与阶段目标',
    filename: 'Palantir学习方法论与阶段目标.md',
    category: '学习方法论',
    phase: 1,
    type: 'guide',
    size: 16707,
    tags: ['学习方法', '阶段目标', '费曼技巧'],
    description: '第一阶段总结和第二阶段目标设定',
    priority: 3
  },

  // 第二阶段：理解阶段 - Ontology
  {
    id: 'feynman-ontology',
    title: '费曼解释_Ontology',
    filename: '费曼解释_Ontology.md',
    category: 'Ontology',
    phase: 2,
    type: 'feynman',
    size: 11731,
    tags: ['Ontology', '费曼技巧', '类比解释'],
    description: '向 10 岁小孩解释 Ontology，包含生活化类比和实例',
    priority: 5
  },
  {
    id: 'ontology-concept-card',
    title: 'Ontology核心概念卡片',
    filename: 'Ontology核心概念卡片.md',
    category: 'Ontology',
    phase: 2,
    type: 'concept-card',
    size: 11978,
    tags: ['Ontology', '核心概念', '速查'],
    description: 'Ontology 核心概念一页纸速查卡片',
    priority: 5
  },
  {
    id: 'ontology-quiz',
    title: 'Ontology自我检验问答',
    filename: 'Ontology自我检验问答.md',
    category: 'Ontology',
    phase: 2,
    type: 'quiz',
    size: 21054,
    tags: ['Ontology', '自我检验', '问答'],
    description: '17 个问题，7 个层次的 Ontology 自我检验',
    priority: 4
  },
  {
    id: 'ontology-knowledge-gaps',
    title: '知识空白清单_Ontology',
    filename: '知识空白清单_Ontology.md',
    category: 'Ontology',
    phase: 2,
    type: 'guide',
    size: 8529,
    tags: ['Ontology', '知识空白', '学习笔记'],
    description: '费曼解释过程中发现的 Ontology 知识空白',
    priority: 2
  },
  {
    id: 'aip-ontology-integration',
    title: 'AIP_Ontology_集成笔记',
    filename: 'AIP_Ontology_集成笔记.md',
    category: 'Ontology',
    phase: 2,
    type: 'guide',
    size: 7934,
    tags: ['AIP', 'Ontology', '集成', 'AI'],
    description: 'AIP 与 Ontology 的集成机制和应用案例',
    priority: 3
  },

  // 第二阶段：理解阶段 - Foundry
  {
    id: 'feynman-foundry',
    title: '费曼解释_Foundry',
    filename: '费曼解释_Foundry.md',
    category: 'Foundry',
    phase: 2,
    type: 'feynman',
    size: 17720,
    tags: ['Foundry', '费曼技巧', '类比解释'],
    description: '向 10 岁小孩解释 Foundry 平台和九大能力集',
    priority: 5
  },
  {
    id: 'foundry-concept-card',
    title: 'Foundry核心概念卡片',
    filename: 'Foundry核心概念卡片.md',
    category: 'Foundry',
    phase: 2,
    type: 'concept-card',
    size: 13444,
    tags: ['Foundry', '核心概念', '速查'],
    description: 'Foundry 核心概念一页纸速查卡片',
    priority: 5
  },
  {
    id: 'foundry-quiz',
    title: 'Foundry自我检验问答',
    filename: 'Foundry自我检验问答.md',
    category: 'Foundry',
    phase: 2,
    type: 'quiz',
    size: 26105,
    tags: ['Foundry', '自我检验', '问答'],
    description: 'Foundry 多层次自我检验问答',
    priority: 4
  },

  // 第二阶段：理解阶段 - 用例驱动方法论
  {
    id: 'feynman-use-case',
    title: '费曼解释_用例驱动方法论',
    filename: '费曼解释_用例驱动方法论.md',
    category: '用例驱动',
    phase: 2,
    type: 'feynman',
    size: 20033,
    tags: ['用例驱动', '费曼技巧', '方法论'],
    description: '向 10 岁小孩解释用例驱动方法论和五个步骤',
    priority: 5
  },
  {
    id: 'use-case-concept-card',
    title: '用例驱动方法论核心概念卡片',
    filename: '用例驱动方法论核心概念卡片.md',
    category: '用例驱动',
    phase: 2,
    type: 'concept-card',
    size: 10817,
    tags: ['用例驱动', '核心概念', '速查'],
    description: '用例驱动方法论核心概念一页纸速查卡片',
    priority: 5
  },
  {
    id: 'use-case-quiz',
    title: '用例驱动方法论自我检验问答',
    filename: '用例驱动方法论自我检验问答.md',
    category: '用例驱动',
    phase: 2,
    type: 'quiz',
    size: 31152,
    tags: ['用例驱动', '自我检验', '问答'],
    description: '用例驱动方法论多层次自我检验问答',
    priority: 4
  },

  // 第二阶段：理解阶段 - Palantir 与 AI
  {
    id: 'feynman-ai',
    title: '费曼解释_Palantir与AI',
    filename: '费曼解释_Palantir与AI.md',
    category: 'Palantir与AI',
    phase: 2,
    type: 'feynman',
    size: 22905,
    tags: ['AI', 'AIP', '费曼技巧', 'Ontology'],
    description: '向 10 岁小孩解释 Palantir 与 AI 的关系和三层架构',
    priority: 5
  },
  {
    id: 'ai-concept-card',
    title: 'Palantir与AI核心概念卡片',
    filename: 'Palantir与AI核心概念卡片.md',
    category: 'Palantir与AI',
    phase: 2,
    type: 'concept-card',
    size: 14139,
    tags: ['AI', 'AIP', '核心概念', '速查'],
    description: 'Palantir 与 AI 核心概念一页纸速查卡片',
    priority: 5
  },
  {
    id: 'ai-quiz',
    title: 'Palantir与AI自我检验问答',
    filename: 'Palantir与AI自我检验问答.md',
    category: 'Palantir与AI',
    phase: 2,
    type: 'quiz',
    size: 29973,
    tags: ['AI', 'AIP', '自我检验', '问答'],
    description: 'Palantir 与 AI 多层次自我检验问答',
    priority: 4
  },

  // 第二阶段：理解阶段 - 产品 vs 解决方案
  {
    id: 'feynman-product-solution',
    title: '费曼解释_产品vs解决方案',
    filename: '费曼解释_产品vs解决方案.md',
    category: '产品vs解决方案',
    phase: 2,
    type: 'feynman',
    size: 17051,
    tags: ['产品', '解决方案', '费曼技巧', '商业模式'],
    description: '向 10 岁小孩解释产品 vs 解决方案的区别',
    priority: 4
  },
  {
    id: 'product-solution-concept-card',
    title: '产品vs解决方案核心概念卡片',
    filename: '产品vs解决方案核心概念卡片.md',
    category: '产品vs解决方案',
    phase: 2,
    type: 'concept-card',
    size: 12644,
    tags: ['产品', '解决方案', '核心概念', '速查'],
    description: '产品 vs 解决方案核心概念一页纸速查卡片',
    priority: 4
  },
  {
    id: 'product-solution-quiz',
    title: '产品vs解决方案自我检验问答',
    filename: '产品vs解决方案自我检验问答.md',
    category: '产品vs解决方案',
    phase: 2,
    type: 'quiz',
    size: 24245,
    tags: ['产品', '解决方案', '自我检验', '问答'],
    description: '产品 vs 解决方案多层次自我检验问答',
    priority: 3
  },

  // 第二阶段总结
  {
    id: 'phase2-summary',
    title: '第二阶段_费曼技巧学习成果总结',
    filename: '第二阶段_费曼技巧学习成果总结.md',
    category: '阶段总结',
    phase: 2,
    type: 'summary',
    size: 20571,
    tags: ['阶段总结', '费曼技巧', '学习成果'],
    description: '第二阶段学习成果回顾和心得',
    priority: 3
  },

  // 第三阶段：实践阶段
  {
    id: 'inspection-system-requirements',
    title: '检测室系统需求分析',
    filename: '检测室系统需求分析.md',
    category: '实践项目',
    phase: 3,
    type: 'practice',
    size: 8024,
    tags: ['需求分析', '检测室系统', '业务需求'],
    description: '检测室数据分析系统的核心业务需求和关键信息',
    priority: 4
  },
  {
    id: 'inspection-system-ontology',
    title: '检测室系统_Ontology设计',
    filename: '检测室系统_Ontology设计.md',
    category: '实践项目',
    phase: 3,
    type: 'practice',
    size: 20903,
    tags: ['Ontology设计', '检测室系统', 'Objects', 'Actions'],
    description: '检测室系统的完整 Ontology 模型设计',
    priority: 5
  },
  {
    id: 'use-case-welding-scheduling',
    title: '用例设计_焊接协作臂与排产优化',
    filename: '用例设计_焊接协作臂与排产优化.md',
    category: '实践项目',
    phase: 3,
    type: 'practice',
    size: 27900,
    tags: ['用例设计', '焊接设备', '排产优化', 'Alpha'],
    description: '焊接协作臂管理和小组立产线排产优化的用例设计',
    priority: 5
  },
  {
    id: 'inspection-system-project',
    title: '检测室系统_Palantir实践项目',
    filename: '检测室系统_Palantir实践项目.md',
    category: '实践项目',
    phase: 3,
    type: 'practice',
    size: 51039,
    tags: ['完整项目', '技术架构', '实施计划', '应用设计'],
    description: '检测室系统完整的 Palantir 实践项目设计',
    priority: 5
  },
  {
    id: 'phase3-summary',
    title: '第三阶段_实践成果总结',
    filename: '第三阶段_实践成果总结.md',
    category: '阶段总结',
    phase: 3,
    type: 'summary',
    size: 18443,
    tags: ['阶段总结', '实践成果', '能力提升'],
    description: '第三阶段实践成果回顾和能力提升',
    priority: 3
  },

  // 第四阶段：固化阶段
  {
    id: 'phase4-review-plan',
    title: '第四阶段_复习计划与持续学习路径',
    filename: '第四阶段_复习计划与持续学习路径.md',
    category: '复习计划',
    phase: 4,
    type: 'guide',
    size: 18140,
    tags: ['复习计划', '间隔复习', '主动回想', '持续学习'],
    description: '详细的复习计划和持续学习路径',
    priority: 4
  },

  // 总目录
  {
    id: 'master-catalog',
    title: 'Palantir学习文档总目录',
    filename: 'Palantir学习文档总目录.md',
    category: '总目录',
    phase: 0,
    type: 'guide',
    size: 23264,
    tags: ['总目录', '文档索引', '学习路径'],
    description: '完整的 Palantir 学习文档索引和导航',
    priority: 5
  }
];

export const categories = [
  '全部',
  '基础研究',
  '系统架构',
  '产品体系',
  'Ontology',
  'Foundry',
  '用例驱动',
  'Palantir与AI',
  '产品vs解决方案',
  '实践项目',
  '阶段总结',
  '学习方法论',
  '复习计划',
  '总目录'
];

export const phases = [
  { id: 0, name: '总览', color: 'bg-purple-500' },
  { id: 1, name: '第一阶段：拆解', color: 'bg-blue-500' },
  { id: 2, name: '第二阶段：理解', color: 'bg-green-500' },
  { id: 3, name: '第三阶段：实践', color: 'bg-orange-500' },
  { id: 4, name: '第四阶段：固化', color: 'bg-red-500' }
];

export const documentTypes = [
  { value: 'all', label: '全部类型' },
  { value: 'research', label: '研究报告' },
  { value: 'feynman', label: '费曼解释' },
  { value: 'concept-card', label: '概念卡片' },
  { value: 'quiz', label: '自我检验' },
  { value: 'practice', label: '实践项目' },
  { value: 'summary', label: '阶段总结' },
  { value: 'guide', label: '指南' }
];
