import React, { useEffect } from 'react';
import { Container, Item } from './styles/pagination';

function Pagination({nPages, currentPage, setCurrentPage}) {
    const pageNumbers = [...Array(nPages + 1).keys()].slice(1);
    const nextPage = () => {
        if(currentPage !== nPages) {
            setCurrentPage(currentPage + 1);
        }
    }
    const prevPage = () => {
        if(currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }
    const numberPage = (pgNumber) => {
        if(currentPage !== pgNumber) {
            setCurrentPage(pgNumber);
        }
    }

    return(
        <Container>
            <Item endItem onClick={prevPage}>
                Previous
            </Item>
            {pageNumbers.map((pgNumber) => {
                return (
                    (pgNumber === (currentPage + 1) || pgNumber === (currentPage - 1) || pgNumber === (currentPage)) &&
                    <Item key={pgNumber} active={currentPage === pgNumber} onClick={() => numberPage(pgNumber)}>
                        {pgNumber}
                    </Item>
                );
            })}
            <Item endItem onClick={nextPage}>
                Next
            </Item>
        </Container>
    );
}

export default Pagination;