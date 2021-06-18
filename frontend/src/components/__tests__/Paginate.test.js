import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAtrr, checkProps } from "../../utils";
import Paginate from '../Paginate';

describe('Paginate Component', () => {

    describe('Checking PropTypes', () => {

        it('Should NOT throw a warning', () => {
            const expectedProps = {
                pages: 34,
                page:2,
                isAdmin: true,
                
            };
            const propsError = checkProps(Paginate, expectedProps);
            expect(propsError).toBeUndefined();
        });

    });

    describe('Component Renders', () => {

        let wrapper;
        beforeEach(() => {
            const props = {
                pages: 3,
                page:2,
                isAdmin: true
            };
            wrapper = shallow(<Paginate {...props} />);
        });


        it('Should render without errors', () => {
            const pages = findByTestAtrr(wrapper, 'paginateComponent');
            expect(pages.length).toBe(1);
        });

        it('Should render without errors', () => {
            const page = findByTestAtrr(wrapper, 'componentPage');
            expect(page.length).toBe(3);
        });

      
    });

});