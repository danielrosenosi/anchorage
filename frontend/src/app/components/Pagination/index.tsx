import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { GrFormNext } from 'react-icons/gr';
import { GrFormPrevious } from 'react-icons/gr';

type PaginationProps = {
    itemsPerPage: number;
    changeSelectedPage: (selected: number) => void;
    totalPages: number;
}

type PageChangeEventProps = {
    selected: number;
}

export function Pagination({ itemsPerPage, changeSelectedPage, totalPages }: PaginationProps) {
    const pages = Array(totalPages).fill(1).map((x: number, y: number) => x + y);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        setPageCount(Math.ceil(pages.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, totalPages]);

    const handlePageClick = (event: PageChangeEventProps) => {
        const newOffset = event.selected + 1;

        changeSelectedPage(newOffset);
        setItemOffset(newOffset);
    };

    return (
        <ReactPaginate
            containerClassName="pagination"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            activeClassName="active"
            nextClassName="page-item next"
            nextLinkClassName="page-link"
            previousClassName="page-item previous"
            previousLinkClassName="page-link"
            breakLabel="..."
            nextLabel={<GrFormNext />}
            previousLabel={<GrFormPrevious />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
        />
    );
}