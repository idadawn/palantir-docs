# 检测室系统 - Palantir Ontology 设计

## 设计原则

基于 Palantir 的 Ontology 方法论，我们将：
1. **识别核心业务对象**（"名词"）
2. **定义对象属性**（Properties）
3. **建立对象关系**（Links）
4. **设计业务动作**（Actions）
5. **实现四重集成**（Data + Logic + Action + Security）

---

## 第一部分：Objects（业务对象）

### 1. Product Specification（产品规格）

**定义**：带材产品的规格定义

**Properties（属性）**：
- `spec_code`：规格代码（120、142、170、213）
- `spec_name`：规格名称
- `valid_columns`：对应原始数据有效列（13、15、18、22）
- `length`：长度（米）
- `layers`：层数（默认 20）
- `density`：密度（默认 7.25 g/cm³）
- `a_class_threshold`：A 类阈值
- `b_class_threshold`：B 类阈值
- `created_at`：创建时间
- `updated_at`：更新时间

**业务意义**：
- 定义产品的物理特性和质量标准
- 为数据解析和质量判定提供基准

---

### 2. Production Batch（生产批次/炉号）

**定义**：一次生产的批次，由炉号唯一标识

**Properties（属性）**：
- `batch_id`：批次 ID（主键）
- `furnace_code`：完整炉号（如"1甲20251101-1-4-1脆"）
- `line_no`：产线编号（1、2、3...）
- `shift`：班次（甲、乙、丙）
- `prod_date`：生产日期（YYYYMMDD）
- `furnace_no`：炉号
- `coil_no`：卷号
- `subcoil_no`：分卷号
- `feature_suffix`：特性描述（如"脆"）
- `spec_code`：产品规格代码
- `status`：状态（待检测、检测中、已完成）
- `created_at`：创建时间

**业务意义**：
- 生产追溯的核心单元
- 连接原始数据、中间数据和质量判定

---

### 3. Raw Detection Data（原始检测数据）

**定义**：从检测设备导出的原始数据

**Properties（属性）**：
- `raw_id`：原始数据 ID（主键）
- `batch_id`：关联的批次 ID
- `detection_date`：检测日期
- `width`：宽度（mm）
- `weight`：带材重量（g）
- `col_1` ~ `col_22`：22 列检测数据
- `import_time`：导入时间
- `import_user`：导入用户
- `validation_status`：校验状态（通过、失败）
- `error_message`：错误信息

**业务意义**：
- 质量分析的原始数据源
- 支持数据追溯和审计

---

### 4. Intermediate Detection Data（中间检测数据）

**定义**：在原始数据基础上计算和录入的业务数据

**Properties（属性）**：

#### 基础信息
- `mid_id`：中间数据 ID（主键）
- `batch_id`：关联的批次 ID
- `spray_no`：喷次（产线+班次+日期+炉号）
- `month`：月份（YYYY-MM）

#### 物理属性（自动计算）
- `weight_per_meter`：一米带材重量（g）
- `width`：带宽（mm）
- `thickness_values`：带厚数组（从原始数据计算）
- `thickness_range`：带厚范围（最小值～最大值）
- `thickness_deviation`：带厚极差（最大值 - 最小值）
- `avg_thickness`：平均厚度
- `density`：密度（g/cm³）
- `stacking_coefficient`：叠片系数
- `weight_per_4m`：四米带材重量（g）
- `max_thickness`：最大厚度
- `max_avg_thickness`：最大平均厚度

#### 磁性能（人工录入）
- `ss_before`：Ss（刻痕前）
- `ps_before`：激磁功率（刻痕前）
- `iron_loss_before`：铁损（刻痕前）
- `hc_before`：Hc（刻痕前）
- `ss_after`：Ss（刻痕后）
- `ps_after`：激磁功率（刻痕后）
- `iron_loss_after`：铁损（刻痕后）
- `hc_after`：Hc（刻痕后）

#### 外观特性（人工录入）
- `appearance_features`：外观特征列表
- `break_count`：断头数（个）
- `coil_weight`：单卷重量（kg）

#### 花纹数据（自动计算）
- `left_pattern`：左花纹（Si、B、纹宽、纹距）
- `center_pattern`：中花纹（Si、B、纹宽、纹距）
- `right_pattern`：右花纹（Si、B、纹宽、纹距）

#### 判定结果（自动计算）
- `magnetic_judgment`：磁性能判定
- `thickness_judgment`：厚度判定
- `stacking_judgment`：叠片系数判定
- `quality_grade`：质量等级（A、B、C、不合格）

#### 元数据
- `performance_input_user`：性能录入员
- `appearance_input_user`：外观检验员
- `input_time`：录入时间
- `updated_at`：更新时间

**业务意义**：
- 质量分析的核心数据
- 支持多维度统计和分析

---

### 5. Appearance Feature（外观特征）

**定义**：带材的外观缺陷特征

**Properties（属性）**：
- `feature_id`：特征 ID（主键）
- `feature_code`：特征代码
- `feature_name`：特征名称（如"脆"）
- `category`：大类（韧性、脆边、麻点、划痕、网眼、毛边、亮线、劈裂、棱、龟裂纹）
- `severity`：严重程度（严重、中等、轻微）
- `description`：描述
- `created_at`：创建时间

**业务意义**：
- 标准化外观缺陷分类
- 支持质量判定和缺陷分析

---

### 6. Quality Statistics（质量统计）

**定义**：按维度汇总的质量统计数据

**Properties（属性）**：
- `stat_id`：统计 ID（主键）
- `stat_date`：统计日期
- `dimension_type`：统计维度类型（日、月、班次、产线、规格）
- `dimension_value`：维度值
- `spec_code`：产品规格代码
- `line_no`：产线编号
- `shift`：班次
- `total_count`：总检测量
- `a_class_count`：A 类数量
- `b_class_count`：B 类数量
- `c_class_count`：C 类数量
- `unqualified_count`：不合格数量
- `a_class_ratio`：A 类占比
- `b_class_ratio`：B 类占比
- `c_class_ratio`：C 类占比
- `avg_iron_loss`：平均铁损
- `avg_hc`：平均 Hc
- `defect_distribution`：缺陷分布
- `created_at`：创建时间

**业务意义**：
- 支持多维度质量分析
- 为决策提供数据支持

---

### 7. Welding Robot（焊接协作臂）【扩展】

**定义**：焊接协作臂设备

**Properties（属性）**：
- `robot_id`：设备 ID（主键）
- `robot_code`：设备编号
- `robot_name`：设备名称
- `robot_type`：设备类型
- `line_no`：所属产线
- `status`：设备状态（运行中、空闲、维护中、故障）
- `current_task`：当前任务
- `total_runtime`：累计运行时间
- `maintenance_date`：上次维护日期
- `next_maintenance_date`：下次维护日期
- `created_at`：创建时间
- `updated_at`：更新时间

**业务意义**：
- 管理焊接设备
- 支持设备调度和维护

---

### 8. Welding Task（焊接任务）【扩展】

**定义**：焊接协作臂的焊接任务

**Properties（属性）**：
- `task_id`：任务 ID（主键）
- `robot_id`：关联的设备 ID
- `batch_id`：关联的批次 ID
- `task_status`：任务状态（待执行、执行中、已完成、失败）
- `start_time`：开始时间
- `end_time`：结束时间
- `welding_current`：焊接电流（A）
- `welding_voltage`：焊接电压（V）
- `welding_speed`：焊接速度（mm/s）
- `gas_flow`：气体流量（L/min）
- `weld_quality`：焊缝质量评分
- `defect_count`：缺陷数量
- `defect_types`：缺陷类型列表
- `operator`：操作员
- `created_at`：创建时间

**业务意义**：
- 记录焊接过程数据
- 支持质量追溯和工艺优化

---

### 9. Production Order（生产订单）【扩展】

**定义**：客户订单或生产计划

**Properties（属性）**：
- `order_id`：订单 ID（主键）
- `order_no`：订单编号
- `customer_name`：客户名称
- `spec_code`：产品规格代码
- `quantity`：订单数量
- `unit`：单位（吨、卷）
- `delivery_date`：交期
- `priority`：优先级（高、中、低）
- `status`：状态（待排产、已排产、生产中、已完成）
- `created_at`：创建时间
- `updated_at`：更新时间

**业务意义**：
- 驱动生产计划
- 连接订单和生产

---

### 10. Production Schedule（生产排程）【扩展】

**定义**：小组立产线的生产排程

**Properties（属性）**：
- `schedule_id`：排程 ID（主键）
- `order_id`：关联的订单 ID
- `line_no`：产线编号
- `shift`：班次
- `scheduled_date`：计划生产日期
- `scheduled_start_time`：计划开始时间
- `scheduled_end_time`：计划结束时间
- `actual_start_time`：实际开始时间
- `actual_end_time`：实际结束时间
- `scheduled_quantity`：计划数量
- `actual_quantity`：实际数量
- `status`：状态（待生产、生产中、已完成、延期）
- `quality_prediction`：质量预测（基于历史数据）
- `created_at`：创建时间
- `updated_at`：更新时间

**业务意义**：
- 优化生产计划
- 提高产线利用率

---

## 第二部分：Links（对象关系）

### 1. Product Specification → Production Batch
- **关系类型**：`has_batches`
- **方向**：一对多
- **业务含义**：一个产品规格对应多个生产批次

### 2. Production Batch → Raw Detection Data
- **关系类型**：`has_raw_data`
- **方向**：一对多
- **业务含义**：一个生产批次对应多条原始检测数据

### 3. Production Batch → Intermediate Detection Data
- **关系类型**：`has_intermediate_data`
- **方向**：一对一
- **业务含义**：一个生产批次对应一条中间检测数据

### 4. Intermediate Detection Data → Appearance Feature
- **关系类型**：`has_features`
- **方向**：多对多
- **业务含义**：一条中间数据可以有多个外观特征

### 5. Production Batch → Quality Statistics
- **关系类型**：`contributes_to_statistics`
- **方向**：多对一
- **业务含义**：多个生产批次汇总为一条质量统计

### 6. Welding Robot → Welding Task【扩展】
- **关系类型**：`executes_tasks`
- **方向**：一对多
- **业务含义**：一个焊接设备执行多个焊接任务

### 7. Production Batch → Welding Task【扩展】
- **关系类型**：`has_welding_task`
- **方向**：一对一
- **业务含义**：一个生产批次对应一个焊接任务

### 8. Production Order → Production Schedule【扩展】
- **关系类型**：`has_schedules`
- **方向**：一对多
- **业务含义**：一个订单可以分多个排程生产

### 9. Production Schedule → Production Batch【扩展】
- **关系类型**：`produces_batches`
- **方向**：一对多
- **业务含义**：一个排程产生多个生产批次

---

## 第三部分：Actions（业务动作）

### 1. Import Raw Data（导入原始数据）

**输入**：
- Excel 文件
- 导入用户

**逻辑**：
1. 解析 Excel 表头
2. 解析炉号（产线、班次、日期、炉号、卷号、分卷号、特性）
3. 识别产品规格（根据检测列索引和宽度）
4. 校验数据（必填字段、数值范围）
5. 创建 Production Batch 对象
6. 创建 Raw Detection Data 对象
7. 生成错误报告（如有）

**输出**：
- Production Batch 对象列表
- Raw Detection Data 对象列表
- 错误报告

**权限**：
- 检测数据导入员

---

### 2. Calculate Intermediate Data（计算中间数据）

**输入**：
- Production Batch ID
- Raw Detection Data

**逻辑**：
1. 读取原始数据
2. 计算物理属性：
   - 一米带材重量 = 带材重量 / 长度
   - 带厚 = 检测数据 / 层数
   - 带厚范围、带厚极差、平均厚度
   - 密度 = 一米带材重量 / (带宽 * 平均厚度/10)
   - 叠片系数 = 四米带材重量 / (带宽 * 400 * 平均厚度 * 7.25 * 0.0000001)
3. 计算花纹数据
4. 创建 Intermediate Detection Data 对象

**输出**：
- Intermediate Detection Data 对象

**权限**：
- 系统自动执行

---

### 3. Input Performance Data（录入性能数据）

**输入**：
- Intermediate Detection Data ID
- 磁性能数据（Ss、激磁功率、铁损、Hc）

**逻辑**：
1. 更新 Intermediate Detection Data 对象的磁性能属性
2. 触发质量判定

**输出**：
- 更新后的 Intermediate Detection Data 对象

**权限**：
- 性能录入员

---

### 4. Input Appearance Data（录入外观数据）

**输入**：
- Intermediate Detection Data ID
- 外观特征列表
- 断头数
- 单卷重量

**逻辑**：
1. 更新 Intermediate Detection Data 对象的外观属性
2. 关联 Appearance Feature 对象
3. 触发质量判定

**输出**：
- 更新后的 Intermediate Detection Data 对象

**权限**：
- 外观检测员

---

### 5. Judge Quality（质量判定）

**输入**：
- Intermediate Detection Data ID

**逻辑**：
1. 读取中间数据
2. 读取产品规格的阈值
3. 判定磁性能：
   - 铁损和 Hc 均不超过 A 类阈值 → A 类
   - 超过 A 类但在 B 类范围 → B 类
   - 超出 B 类范围 → C 类/不合格
4. 判定厚度：
   - 带厚极差在允许范围内 → 合格
   - 超出范围 → 不合格
5. 判定叠片系数：
   - 叠片系数在允许范围内 → 合格
   - 超出范围 → 不合格
6. 综合判定质量等级
7. 更新 Intermediate Detection Data 对象的判定结果

**输出**：
- 更新后的 Intermediate Detection Data 对象（包含质量等级）

**权限**：
- 系统自动执行

---

### 6. Generate Statistics（生成统计）

**输入**：
- 统计维度（日期、班次、规格、产线）
- 时间范围

**逻辑**：
1. 读取符合条件的 Intermediate Detection Data 对象
2. 按维度分组
3. 计算指标：
   - 总检测量
   - A/B/C 类数量及占比
   - 平均铁损、平均 Hc
   - 缺陷分布
4. 创建 Quality Statistics 对象

**输出**：
- Quality Statistics 对象列表

**权限**：
- 质量工程师

---

### 7. Export Report（导出报表）

**输入**：
- Quality Statistics ID 列表
- 导出格式（Excel、PDF）

**逻辑**：
1. 读取 Quality Statistics 对象
2. 生成报表模板
3. 填充数据
4. 导出文件

**输出**：
- 报表文件

**权限**：
- 质量工程师、领导/管理层

---

### 8. Natural Language Query（自然语言问数）

**输入**：
- 自然语言问题（如"甲班组本月检测量中 A 类占比情况"）

**逻辑**：
1. 调用大模型解析意图
2. 提取关键信息：
   - 维度：班次（甲）
   - 时间范围：本月
   - 指标：检测量、A 类占比
3. 生成结构化查询
4. 执行查询
5. 生成表格、图表、文字说明

**输出**：
- 表格数据
- 图表
- 文字说明

**权限**：
- 质量工程师、领导/管理层

---

### 9. Assign Welding Task（分配焊接任务）【扩展】

**输入**：
- Production Batch ID
- Welding Robot ID

**逻辑**：
1. 检查设备状态（是否空闲）
2. 创建 Welding Task 对象
3. 更新设备状态为"执行中"
4. 发送任务指令到设备

**输出**：
- Welding Task 对象

**权限**：
- 生产调度员

---

### 10. Optimize Production Schedule（优化生产排程）【扩展】

**输入**：
- Production Order 列表
- 时间范围
- 产线资源

**逻辑**：
1. 读取订单信息（规格、数量、交期、优先级）
2. 读取产线资源（产线、设备、人员、班次）
3. 读取历史质量数据（质量预测）
4. 优化算法：
   - 最小化延期
   - 最大化产线利用率
   - 考虑质量预测
5. 生成 Production Schedule 对象列表

**输出**：
- Production Schedule 对象列表

**权限**：
- 生产计划员

---

## 第四部分：四重集成（Data + Logic + Action + Security）

### Data（数据）
- **原始数据**：Raw Detection Data
- **业务数据**：Intermediate Detection Data
- **统计数据**：Quality Statistics
- **设备数据**：Welding Robot、Welding Task
- **计划数据**：Production Order、Production Schedule

### Logic（逻辑）
- **炉号解析**：从炉号字符串解析产线、班次、日期等
- **规格识别**：根据检测列索引和宽度识别产品规格
- **物理属性计算**：带厚、密度、叠片系数等
- **质量判定**：基于阈值判定质量等级
- **统计汇总**：多维度统计分析
- **排产优化**：基于订单、资源、质量预测的优化算法

### Action（动作）
- **导入数据**：Import Raw Data
- **计算中间数据**：Calculate Intermediate Data
- **录入性能数据**：Input Performance Data
- **录入外观数据**：Input Appearance Data
- **质量判定**：Judge Quality
- **生成统计**：Generate Statistics
- **导出报表**：Export Report
- **自然语言问数**：Natural Language Query
- **分配焊接任务**：Assign Welding Task
- **优化生产排程**：Optimize Production Schedule

### Security（安全）
- **角色权限**：
  - 管理员：系统配置、用户管理
  - 检测数据导入员：导入原始数据
  - 性能录入员：录入性能数据
  - 外观检测员：录入外观数据
  - 质量工程师：查看统计、生成报表
  - 领导/管理层：查看报表、自然语言问数
  - 生产调度员：分配焊接任务
  - 生产计划员：优化生产排程
- **数据权限**：
  - 按产线限制数据访问
  - 按班次限制数据访问
- **审计日志**：
  - 记录所有数据变更
  - 记录所有 Action 执行

---

## 第五部分：Ontology 可视化

### 核心对象关系图

```
Product Specification
    ↓ has_batches
Production Batch
    ↓ has_raw_data
Raw Detection Data
    ↓ calculates
Intermediate Detection Data
    ↓ has_features
Appearance Feature

Production Batch
    ↓ has_intermediate_data
Intermediate Detection Data
    ↓ judges
Quality Grade (A/B/C/不合格)
    ↓ contributes_to_statistics
Quality Statistics

Production Batch
    ↓ has_welding_task
Welding Task
    ↓ executed_by
Welding Robot

Production Order
    ↓ has_schedules
Production Schedule
    ↓ produces_batches
Production Batch
```

---

### 数据流图

```
Excel 文件
    ↓ Import Raw Data
Raw Detection Data
    ↓ Calculate Intermediate Data
Intermediate Detection Data (物理属性)
    ↓ Input Performance Data
Intermediate Detection Data (磁性能)
    ↓ Input Appearance Data
Intermediate Detection Data (外观特性)
    ↓ Judge Quality
Intermediate Detection Data (质量等级)
    ↓ Generate Statistics
Quality Statistics
    ↓ Export Report / Natural Language Query
报表 / 问答结果
```

---

## 第六部分：与传统方法的对比

### 传统方法（Excel）

| 方面 | 传统方法 |
|------|---------|
| **数据存储** | 多个 Excel 文件，版本不一致 |
| **数据计算** | 手工公式，易出错 |
| **数据追溯** | 困难，无版本控制 |
| **统计分析** | 手工汇总，口径不统一 |
| **权限控制** | 文件级，粗粒度 |
| **审计日志** | 无 |
| **扩展性** | 差，难以集成其他系统 |

---

### Palantir Ontology 方法

| 方面 | Palantir Ontology 方法 |
|------|----------------------|
| **数据存储** | 统一的 Ontology，结构化存储 |
| **数据计算** | 自动计算，逻辑封装在 Actions 中 |
| **数据追溯** | 完整的数据血缘和版本控制 |
| **统计分析** | 自动汇总，口径统一 |
| **权限控制** | 对象级、属性级，细粒度 |
| **审计日志** | 完整的操作日志 |
| **扩展性** | 强，易于集成 MES、ERP、设备等 |

---

## 第七部分：实施优势

### 1. 数据一致性
- 单一数据源（Single Source of Truth）
- 统一的数据模型（Ontology）
- 自动计算，减少人为错误

### 2. 业务敏捷性
- 快速响应业务变化
- 灵活的统计维度
- 自然语言问数

### 3. 可追溯性
- 完整的数据血缘
- 审计日志
- 版本控制

### 4. 可扩展性
- 易于添加新的 Objects（如焊接设备、生产订单）
- 易于添加新的 Actions（如排产优化）
- 易于集成外部系统

### 5. AI 增强
- 基于 Ontology 的 AI 理解业务语义
- 自然语言问数
- 质量预测
- 排产优化

---

## 第八部分：下一步

### 1. 用例设计
- 用例 1：焊接协作臂管理
- 用例 2：小组立产线排产

### 2. 架构设计
- 基于 Foundry 的系统架构
- 数据服务、逻辑服务、工作流服务
- AI 服务集成

### 3. 实施路径
- 阶段 1：基础 Ontology 和核心 Actions
- 阶段 2：统计分析和报表
- 阶段 3：自然语言问数
- 阶段 4：焊接设备和排产优化

---

## 总结

我们设计了一个完整的 Palantir Ontology 模型，包括：
- **10 个核心 Objects**：产品规格、生产批次、原始数据、中间数据、外观特征、质量统计、焊接设备、焊接任务、生产订单、生产排程
- **9 个 Links**：对象之间的关系
- **10 个 Actions**：业务动作
- **四重集成**：Data + Logic + Action + Security

这个 Ontology 模型：
1. **完整覆盖**检测室数据分析系统的核心业务
2. **扩展支持**焊接协作臂管理和小组立产线排产
3. **实现四重集成**，支持 Human+AI 团队
4. **相比传统 Excel 方法**，具有显著优势

下一步，我们将基于这个 Ontology 模型设计具体的用例。
