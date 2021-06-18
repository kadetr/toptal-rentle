import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAtrr, checkProps } from "../../utils";
import ListApartmentItem from '../ListApartmentItem';

describe('ListApartmentItem Component', () => {

    describe('Checking PropTypes', () => {

        it('Should NOT throw a warning', () => {
            const expectedProps = {
                apartment: {
                    name: 'Nice house next park',
                    description:
                      'The house is located at the city center. River can be seen from terasse.',
                    price: 1400,
                    size: 126,
                    rooms: 3,
                    geolocation: {lat: 38.3251, lng: 27.1225},
                    rName: "Kemal Deniz",
                    isRented: false,
                  },
                  getSelectedId: ()=>{}
                
            };
            const propsError = checkProps(ListApartmentItem, expectedProps);
            expect(propsError).toBeUndefined();
        });

    });

    describe('Component Renders', () => {

        let wrapper;
        let mockFunc;
        beforeEach(() => {
            mockFunc = jest.fn()
            const props = {
                apartment: {
                    name: 'Nice house next park',
                    description:
                      'The house is located at the city center. River can be seen from terasse.',
                    price: 1400,
                    size: 126,
                    rooms: 3,
                    geolocation: {lat: 38.3251, lng: 27.1225},
                    rName: "Kemal Deniz",
                    isRented: false,
                  },
                  getSelectedId: mockFunc
            };
            wrapper = shallow(<ListApartmentItem {...props} />);
        });

        it('Should renders without error', () => {
            const component = findByTestAtrr(wrapper, 'listApartmentItemComponent');
            expect(component.length).toBe(1);
        });

        it('Should render a name', () => {
            const name = findByTestAtrr(wrapper, 'componentName');
            expect(name.length).toBe(1);
        });

        it('Should render a price', () => {
            const price = findByTestAtrr(wrapper, 'componentPrice');
            expect(price.length).toBe(1);
        });

        it('Should render a size', () => {
            const size = findByTestAtrr(wrapper, 'componentSize');
            expect(size.length).toBe(1);
        });

        it('Should render a  # of rooms   ', () => {
            const rooms = findByTestAtrr(wrapper, 'componentRooms');
            expect(rooms.length).toBe(1);
        });

        it('Should emit callback on click event', () => {
            const item = findByTestAtrr(wrapper, 'componentName');
            item.simulate('click');
            const callback = mockFunc.mock.calls.length;
            expect(callback).toBe(1);
        });

        it('Should emit callback on click event', () => {
            const item = findByTestAtrr(wrapper, 'componentPrice');
            item.simulate('click');
            const callback = mockFunc.mock.calls.length;
            expect(callback).toBe(1);
        });

    });

});