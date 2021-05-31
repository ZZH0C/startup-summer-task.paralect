import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import noRepoIcon from '../../../../assets/no-repo-icon.png'

const PER_PAGE = 4;

export function UserRepos(props) {
    const repos = props.repos.map((elem, index) =>
        <div key={index} className='repo_item'>
            <a
                target="_blank"
                rel="noopener noreferrer"
                href={elem.html_url}>
                {elem.name}
            </a>
            <span>{elem.description}</span>
        </div>
    );

    const [currentPage, setCurrentPage] = useState(0);
    if (props.repos[0]) {


        function handlePageClick({selected: selectedPage}) {
            setCurrentPage(selectedPage);
        }

        const offset = currentPage * PER_PAGE;

        const currentPageData = repos.slice(offset, offset + PER_PAGE)

        const pageCount = Math.ceil(repos.length / PER_PAGE);


        return (
            <div className='view-screen_user-info_repo'>

                <h1>Repositories ({props.repos.length})</h1>

                {currentPageData}
                <div className='pagination_container'>
                    <ReactPaginate
                        previousLabel={"<"}
                        nextLabel={">"}
                        pageCount={pageCount}
                        onPageChange={handlePageClick}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={2}
                        containerClassName={"pagination"}
                        previousLinkClassName={"pagination__link"}
                        nextLinkClassName={"pagination__link"}
                        disabledClassName={"pagination__link--disabled"}
                        activeClassName={"pagination__link--active"}
                    />
                </div>
            </div>
        )
    } else {
        return (
            <div className='view-screen_user-info_repo-empty'>
                <div>
                    <img
                        alt='noRepoIcon'
                        src={noRepoIcon}
                    />
                    <span>Repository list is empty</span>
                </div>
            </div>
        )
    }
}


UserRepos.propTypes = PropTypes.any.isRequired;

export default UserRepos;
