import { useState } from "react";
import ItemList from "./ItemList";

const ResCategory = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!data) return null;

  // Get count of items in this category
  const itemCount = data.itemCards?.length || 0;

  return (
    <div className="category-container">
      {/* Accordion Header */}
      <button className="category-header" onClick={() => setIsOpen(!isOpen)}>
        <span className="category-title">
          {data.title} {itemCount > 0 ? `(${itemCount})` : ""}
        </span>
        <span className="arrow">{isOpen ? "▲" : "▼"}</span>
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className="category-content">
          <ItemList items={data.itemCards} />
          {data.categories?.map((nestedCategory) => (
            <ResCategory key={nestedCategory.title} data={nestedCategory} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ResCategory;
