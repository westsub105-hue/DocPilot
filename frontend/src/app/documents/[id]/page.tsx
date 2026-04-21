import Link from "next/link";

import DocumentDetailView from "@/components/document-detail-view";

type DocumentDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DocumentDetailPage({ params }: DocumentDetailPageProps) {
  const { id } = await params;
  return (
    <main className="shell">
      <section className="panel">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Document detail</p>
            <h1>Document #{id}</h1>
          </div>
          <Link className="textLink" href="/documents">
            Back to documents
          </Link>
        </div>
        <DocumentDetailView documentId={id} />
      </section>
    </main>
  );
}
