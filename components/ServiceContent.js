export default function ServiceContent({ content }) {
  return (
    <div 
      className="prose prose-lg prose-gray max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
