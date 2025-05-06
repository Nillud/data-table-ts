import { PaginationPage, PaginationSize, TableData, TableProps } from './DataTable.types';
import NextIcon from './img/NextIcon';
import LastIcon from './img/LastIcon';
import PrevIcon from './img/PrevIcon';
import FirstIcon from './img/FirstIcon';

type Props = {
  tableData: TableData;
  paginationCounts: TableProps["paginationCounts"];
  paginationSize: PaginationSize;
  getPaginationSize: (size: PaginationSize) => void;
  paginationPage: PaginationPage;
  getPaginationPage: (page: PaginationPage) => void;
};

const TableFooter = ({
  tableData,
  paginationCounts,
  paginationSize,
  getPaginationSize,
  paginationPage,
  getPaginationPage
}: Props) => {
  const totalItems = tableData.length;
  const totalPages = paginationSize === 0 ? 1 : Math.ceil(totalItems / paginationSize);

  if (totalItems === 0) return null;

  const handleCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    getPaginationSize(Number(e.target.value));
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      getPaginationPage(newPage);
    }
  };

  const renderPageNumbers = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisible = 5;
    let start = Math.max(0, paginationPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages - 1, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(0, end - maxVisible + 1);
    }

    if (start > 0) {
      pages.push(
        <button key="page-0" onClick={() => handlePageChange(0)}>
          1
        </button>
      );
      if (start > 1) {
        pages.push(<span key="ellipsis-start">...</span>);
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={`page-${i}`}
          className={i === paginationPage ? 'btn-active' : ''}
          onClick={() => handlePageChange(i)}
          disabled={i === paginationPage}
        >
          {i + 1}
        </button>
      );
    }

    if (end < totalPages - 1) {
      if (end < totalPages - 2) {
        pages.push(<span key="ellipsis-end">...</span>);
      }
      pages.push(
        <button key={`page-${totalPages - 1}`} onClick={() => handlePageChange(totalPages - 1)}>
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  const firstItem = paginationSize === 0 ? 1 : paginationPage * paginationSize + 1;
  const lastItem = paginationSize === 0 ? totalItems : Math.min((paginationPage + 1) * paginationSize, totalItems);

  return (
    <div className="table-footer">
      <div className="footer-count">
        <span>Показаны строки с {firstItem} по {lastItem}, </span>
        <span>Всего: {totalItems}</span>
      </div>

      {paginationCounts && (
        <div className="footer-pagination">
          <div className="pagination-counts">
            <span>Показывать строк: </span>
            <select value={paginationSize} onChange={handleCountChange}>
              {paginationCounts.map(count => (
                <option key={`count-${count}`} value={count}>
                  {count === 0 ? 'Все' : count}
                </option>
              ))}
            </select>
          </div>

          <div className="pagination-buttons">
            <button
              disabled={paginationPage === 0}
              onClick={() => handlePageChange(0)}
              aria-label="Первая страница"
            >
              <FirstIcon />
            </button>
            <button
              disabled={paginationPage === 0}
              onClick={() => handlePageChange(paginationPage - 1)}
              aria-label="Предыдущая страница"
            >
              <PrevIcon />
            </button>

            <div className="buttons-num">{renderPageNumbers()}</div>

            <button
              disabled={paginationPage >= totalPages - 1}
              onClick={() => handlePageChange(paginationPage + 1)}
              aria-label="Следующая страница"
            >
              <NextIcon />
            </button>
            <button
              disabled={paginationPage >= totalPages - 1}
              onClick={() => handlePageChange(totalPages - 1)}
              aria-label="Последняя страница"
            >
              <LastIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableFooter;