import { useState, useMemo, useEffect } from "react";
import { documents, categories, phases, type Document } from "@/data/documents";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  BookOpen, 
  FileText, 
  Lightbulb, 
  CheckCircle2, 
  Code2, 
  ListChecks, 
  BookMarked,
  ChevronRight,
  ChevronDown,
  Star,
  PanelLeftClose,
  PanelLeft
} from "lucide-react";
import { Streamdown } from "streamdown";

export default function Home() {
  const [selectedDocId, setSelectedDocId] = useState<string>(documents[0]?.id || "");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedPhases, setExpandedPhases] = useState<Set<number>>(new Set([0, 1, 2, 3, 4]));
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(categories));
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [documentContent, setDocumentContent] = useState<string>("");
  const [loadingContent, setLoadingContent] = useState(false);

  const selectedDoc = documents.find((d) => d.id === selectedDocId);

  // 加载文档内容
  useEffect(() => {
    if (selectedDoc) {
      setLoadingContent(true);
      fetch(`/docs/${selectedDoc.filename}`)
        .then((res) => res.text())
        .then((text) => {
          setDocumentContent(text);
          setLoadingContent(false);
        })
        .catch(() => {
          setDocumentContent(`# 文档加载失败\n\n无法加载 **${selectedDoc.title}** 的内容。\n\n请确保文档文件存在于 \`/docs/${selectedDoc.filename}\` 路径。`);
          setLoadingContent(false);
        });
    }
  }, [selectedDoc]);

  // 按阶段和分类组织文档
  const organizedDocs = useMemo(() => {
    const filtered = documents.filter((doc) => {
      if (searchQuery === "") return true;
      return (
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });

    const byPhase: Record<number, Record<string, Document[]>> = {};
    
    filtered.forEach((doc) => {
      if (!byPhase[doc.phase]) {
        byPhase[doc.phase] = {};
      }
      if (!byPhase[doc.phase][doc.category]) {
        byPhase[doc.phase][doc.category] = [];
      }
      byPhase[doc.phase][doc.category].push(doc);
    });

    return byPhase;
  }, [searchQuery]);

  // 切换阶段展开/折叠
  const togglePhase = (phaseId: number) => {
    const newExpanded = new Set(expandedPhases);
    if (newExpanded.has(phaseId)) {
      newExpanded.delete(phaseId);
    } else {
      newExpanded.add(phaseId);
    }
    setExpandedPhases(newExpanded);
  };

  // 切换分类展开/折叠
  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  // 获取文档类型图标
  const getTypeIcon = (type: Document["type"]) => {
    const iconClass = "w-4 h-4";
    switch (type) {
      case "research":
        return <FileText className={iconClass} />;
      case "feynman":
        return <Lightbulb className={iconClass} />;
      case "concept-card":
        return <BookMarked className={iconClass} />;
      case "quiz":
        return <CheckCircle2 className={iconClass} />;
      case "practice":
        return <Code2 className={iconClass} />;
      case "summary":
        return <ListChecks className={iconClass} />;
      case "guide":
        return <BookOpen className={iconClass} />;
      default:
        return <FileText className={iconClass} />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="h-14 border-b flex items-center px-4 gap-4 flex-shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          title={sidebarOpen ? "隐藏侧边栏" : "显示侧边栏"}
        >
          {sidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeft className="w-5 h-5" />}
        </Button>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">Palantir 学习文档</h1>
          </div>
        </div>
        <div className="flex-1" />
        <div className="text-sm text-muted-foreground hidden md:block">
          {documents.length} 份文档 · 约 130k 字
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Document Tree */}
        <aside
          className={`${
            sidebarOpen ? "w-80" : "w-0"
          } border-r bg-muted/30 flex flex-col transition-all duration-300 overflow-hidden`}
        >
          {/* Search */}
          <div className="p-4 border-b flex-shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="搜索文档..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Document Tree */}
          <ScrollArea className="flex-1">
            <div className="p-2">
              {phases.map((phase) => {
                const phaseDocs = organizedDocs[phase.id];
                if (!phaseDocs || Object.keys(phaseDocs).length === 0) return null;

                const isPhaseExpanded = expandedPhases.has(phase.id);

                return (
                  <div key={phase.id} className="mb-2">
                    {/* Phase Header */}
                    <button
                      onClick={() => togglePhase(phase.id)}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent text-sm font-semibold transition-colors"
                    >
                      {isPhaseExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                      <span className="flex-1 text-left">{phase.name}</span>
                      <Badge className={`${phase.color} text-xs`}>
                        {Object.values(phaseDocs).flat().length}
                      </Badge>
                    </button>

                    {/* Categories */}
                    {isPhaseExpanded && (
                      <div className="ml-4 mt-1 space-y-1">
                        {Object.entries(phaseDocs).map(([category, docs]) => {
                          const isCategoryExpanded = expandedCategories.has(category);

                          return (
                            <div key={category}>
                              {/* Category Header */}
                              <button
                                onClick={() => toggleCategory(category)}
                                className="w-full flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-accent text-sm transition-colors"
                              >
                                {isCategoryExpanded ? (
                                  <ChevronDown className="w-3 h-3" />
                                ) : (
                                  <ChevronRight className="w-3 h-3" />
                                )}
                                <span className="flex-1 text-left text-muted-foreground">
                                  {category}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {docs.length}
                                </span>
                              </button>

                              {/* Documents */}
                              {isCategoryExpanded && (
                                <div className="ml-4 mt-1 space-y-0.5">
                                  {docs.map((doc) => (
                                    <button
                                      key={doc.id}
                                      onClick={() => setSelectedDocId(doc.id)}
                                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                                        selectedDocId === doc.id
                                          ? "bg-primary text-primary-foreground"
                                          : "hover:bg-accent"
                                      }`}
                                    >
                                      {getTypeIcon(doc.type)}
                                      <span className="flex-1 text-left truncate">
                                        {doc.title.replace(/^(费曼解释_|核心概念卡片_|自我检验问答_|用例设计_|检测室系统_|第.*阶段_|Palantir_|AIP_|知识空白清单_)/, "")}
                                      </span>
                                      {doc.priority >= 4 && (
                                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                      )}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-hidden bg-background">
          {selectedDoc ? (
            <>
              {/* Document Header */}
              <div className="border-b px-8 py-4 flex-shrink-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">{selectedDoc.title}</h2>
                    <p className="text-muted-foreground text-sm mb-3">
                      {selectedDoc.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedDoc.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: selectedDoc.priority }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                  <span>分类: {selectedDoc.category}</span>
                  <Separator orientation="vertical" className="h-4" />
                  <span>{phases[selectedDoc.phase]?.name}</span>
                  <Separator orientation="vertical" className="h-4" />
                  <span>{(selectedDoc.size / 1024).toFixed(1)} KB</span>
                </div>
              </div>

              {/* Document Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="px-8 py-6">
                  {loadingContent ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  ) : (
                    <div className="prose prose-slate max-w-none prose-headings:scroll-mt-20 prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-4 prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-3 prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-2 prose-p:leading-7 prose-p:mb-4 prose-ul:my-4 prose-li:my-1 prose-code:text-sm prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:border prose-pre:p-4 prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-table:border prose-th:border prose-th:p-2 prose-td:border prose-td:p-2">
                      <Streamdown>{documentContent}</Streamdown>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">请选择一个文档</h3>
                <p className="text-sm text-muted-foreground">
                  从左侧目录中选择要阅读的文档
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
