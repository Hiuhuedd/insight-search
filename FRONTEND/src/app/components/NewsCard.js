// components/NewsCard.js
const NewsCard = ({ title, author, publishedDate, snippet, url }) => {
    return (
        <div className="border rounded-lg p-4 mb-4">
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="text-gray-600">{author} - {new Date(publishedDate).toLocaleDateString()}</p>
            <p className="mt-2">{snippet}</p>
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 mt-2 inline-block">
                Link: View
            </a>
        </div>
    );
};

export default NewsCard;