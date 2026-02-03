import { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { documents } from "@/data/documents";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Download, ExternalLink, FileText } from "lucide-react";
import { Streamdown } from "streamdown";

export default function DocumentViewer() {
  const [, params] = useRoute("/doc/:id");
  const [, setLocation] = useLocation();
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const doc = documents.find((d) => d.id === params?.id);

  useEffect(() => {
    if (doc) {
      // 在实际应用中，这里应该从服务器加载文档内容
      // 由于是静态页面，这里模拟加载
      setLoading(true);
      fetch(`/docs/${doc.filename}`)
        .then((res) => res.text())
        .then((text) => {
          setContent(text);
          setLoading(false);
        })
        .catch(() => {
          setContent("# 文档加载失败\n\n无法加载文档内容。请确保文档文件存在。");
          setLoading(false);
        });
    }
  }, [doc]);

  if (!doc) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>文档未找到</CardTitle>
            <CardDescription>请求的文档不存在</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setLocation("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回首页
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Button variant="ghost" onClick={() => setLocation("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              下载
            </Button>
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" />
              在新窗口打开
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Document Info */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2">{doc.title}</CardTitle>
                <CardDescription className="text-base">{doc.description}</CardDescription>
              </div>
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {doc.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>分类: {doc.category}</span>
              <span>·</span>
              <span>阶段: 第{doc.phase}阶段</span>
              <span>·</span>
              <span>大小: {(doc.size / 1024).toFixed(1)} KB</span>
            </div>
          </CardContent>
        </Card>

        {/* Document Content */}
        <Card>
          <CardContent className="p-8">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="prose prose-slate max-w-none">
                <Streamdown>{content}</Streamdown>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
