import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Test from 'react-test-attributes';
import { PropTypes } from 'prop-types'
const Paginate = ({ pages, page, isAdmin = false }) => {
  return (
    pages > 1 && (
      <Test>
      <Pagination data-testid="paginateComponent">
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? `/page/${x + 1}`
                : `/admin/apartmentlist/${x + 1}`
            }
          >
            <Pagination.Item data-testid="componentPage" active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
      </Test>
    )
  )
}

Paginate.propTypes = {
  pages: PropTypes.number,
  page: PropTypes.number,
  isAdmin: PropTypes.bool
}

export default Paginate
