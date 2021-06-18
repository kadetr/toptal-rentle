import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAtrr, checkProps } from "../../utils";
import ApartmentMapInfo from '../ApartmentMapInfo';

describe('ApartmentMapInfo Component', () => {

    describe('Checking PropTypes', () => {

        it('Should NOT throw a warning', () => {
            const expectedProps = {
                apartment: {
                    name: 'Some name text',
                    description:
                      'some description',
                    price: 350000,
                    size: 130,
                    rooms: 4,
                    rName: "Frank Woods"
                
                  },
                  selectedId: "sdfjsvsd"
                  
                
            };
            const propsError = checkProps(ApartmentMapInfo, expectedProps);
            expect(propsError).toBeUndefined();
        });

    });

    describe('Component Renders', () => {

        let wrapper;
        beforeEach(() => {
            const props = {
                apartment: {
                    name: 'Some name text',
                    description:
                      'some description',
                
                  },
                  
            };
            wrapper = shallow(<ApartmentMapInfo {...props} />);
        });

        it('Should renders without error', () => {
            const component = findByTestAtrr(wrapper, 'apartmentMapInfoComponent');
            expect(component.length).toBe(1);
        });

        it('Should render a name', () => {
            const name = findByTestAtrr(wrapper, 'componentName');
            expect(name.length).toBe(1);
        });

        it('Should render a description', () => {
            const desc = findByTestAtrr(wrapper, 'componentDescription');
            expect(desc.length).toBe(1);
        });

        it('Should render a price', () => {
            const price = findByTestAtrr(wrapper, 'componentPrice');
            expect(price.length).toBe(1);
        });

        it('Should render a size', () => {
            const size = findByTestAtrr(wrapper, 'componentSize');
            expect(size.length).toBe(1);
        });

        it('Should render a number of rooms', () => {
            const desc = findByTestAtrr(wrapper, 'componentRooms');
            expect(desc.length).toBe(1);
        });

        it('Should render a realtor name', () => {
            const desc = findByTestAtrr(wrapper, 'componentRealtorName');
            expect(desc.length).toBe(1);
        });

    });

});