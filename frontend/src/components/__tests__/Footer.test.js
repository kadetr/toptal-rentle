import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAtrr } from '../../utils';
import Footer from '../Footer';

const setUp = (props={}) => {
    const component = shallow(<Footer {...props} />);
    return component;
};

describe('Footer Component', () => {

    let component;
    beforeEach(() => {
        component = setUp(); 
    });

    it('Should render without errors', () => {
        const wrapper = findByTestAtrr(component, 'footerComponent');
        expect(wrapper.length).toBe(1);
    });

    it('Should render a logo', () => {
        const fText = findByTestAtrr(component, 'footerText');
        expect(fText.length).toBe(1);
    });

});