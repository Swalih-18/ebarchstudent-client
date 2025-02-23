import BookList from './components/BookList';
import ResearchPaperList from './components/ResearchPaperList';
import TabbedContent from './components/TabbedContent';

export default async function Home() {
  return <TabbedContent books={<BookList />} papers={<ResearchPaperList />} />;
}