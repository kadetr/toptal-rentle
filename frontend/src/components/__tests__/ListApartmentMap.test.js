import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAtrr, checkProps } from "../../utils";
import ListApartmentMap from '../ListApartmentMap';

describe('ListApartmentMap Component', () => {

    describe('Checking PropTypes', () => {

        it('Should NOT throw a warning', () => {
            const expectedProps = {
                apartments: [{
                    name: 'Nice house next park',
                    description:
                      'The house is located at the city center. River can be seen from terasse.',
                    price: 1400,
                    size: 126,
                    rooms: 3,
                    geolocation: {lat: 38.3251, lng: 27.1225},
                    rName: "Kemal Deniz",
                    isRented: false,
                  }],
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
                  selectedId: "",
                  clickable: false,
                  setGeolocationOnMap: () =>{}
                
            };
            const propsError = checkProps(ListApartmentMap, expectedProps);
            expect(propsError).toBeUndefined();
        });

    });

    describe('Component Renders', () => {

        let wrapper;
        let mockFunc;
        beforeEach(() => {
            mockFunc = jest.fn()
            const props = {
                apartments: [{
                    name: 'Nice house next park',
                    description:
                      'The house is located at the city center. River can be seen from terasse.',
                    price: 1400,
                    size: 126,
                    rooms: 3,
                    geolocation: {lat: 38.3251, lng: 27.1225},
                    rName: "Kemal Deniz",
                    isRented: false,
                  }],
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
                  selectedId: "",
                  clickable: false,
                  setGeolocationOnMap: mockFunc
                
            };
            wrapper = shallow(<ListApartmentMap {...props} />);
        });

        it('Should renders without error', () => {
            const component = findByTestAtrr(wrapper, 'listApartmentMapComponent');
            expect(component.length).toBe(1);
        });
    });

});