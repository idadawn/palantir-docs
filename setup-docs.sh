#!/bin/bash

# 创建 docs 目录的符号链接，指向实际的文档位置
mkdir -p /home/ubuntu/palantir-docs-navigator/client/public/docs

# 复制所有 Palantir 学习文档到 public/docs 目录
cd /home/ubuntu
find . -maxdepth 1 -name "*.md" -type f | grep -E "(Palantir|费曼|Ontology|Foundry|用例|产品|检测|第|阶段)" | while read file; do
  cp "$file" /home/ubuntu/palantir-docs-navigator/client/public/docs/
done

echo "文档复制完成！"
ls -lh /home/ubuntu/palantir-docs-navigator/client/public/docs/ | wc -l
