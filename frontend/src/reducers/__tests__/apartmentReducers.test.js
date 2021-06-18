import {apartmentListReducer, apartmentDetailsReducer} from "../apartmentReducers";
import { APARTMENT_LIST_REQUEST, APARTMENT_LIST_SUCCESS, APARTMENT_LIST_FAIL, APARTMENT_DETAILS_REQUEST, APARTMENT_DETAILS_SUCCESS, APARTMENT_DETAILS_FAIL } from "../../constants/apartmentConstants";

let defaultState = {
  apartments: [],
    loading: undefined,
 

};

describe("ApartmentList Reducer", () => {
  it("returns initial state", () => {
    expect(apartmentListReducer(undefined, {})).toEqual(defaultState);
  });

  describe("ApartmentList Sends Request", () => {
      it("an APARTMENT LIST action sends request for list", () => {
        const requestApartmentListAction = {
          type: APARTMENT_LIST_REQUEST,
          listId: "request",
          payload: []
        };
        expect(apartmentListReducer(defaultState, requestApartmentListAction)).toEqual({
          ...defaultState,
          apartments: [],
          loading: true, 
        });
    });
    });
    


    describe("ApartmentList Shows", () => {
        it("an APARTMENT LIST action gets list", () => {
          const successApartmentListAction = {
            type: APARTMENT_LIST_SUCCESS,
            listId: "success",
            payload: [
               {apartments:[{
                    name: 'Nice house next park',
                    description:
                      'The house is located at the city center. River can be seen from terasse.',
                    price: 1400,
                    size: 126,
                    rooms: 3,
                    geolocation: {lat: 38.3251, lng: 27.1225},
                    rName: "Kemal Deniz",
                    isRented: false,
                  }]},
                  {loading: false},
                  
            ]
          };
          expect(apartmentListReducer(defaultState, successApartmentListAction)).toEqual({
            ...defaultState,
            "apartments": Array [
                {
                    name: 'Nice house next park',
                    description:
                      'The house is located at the city center. River can be seen from terasse.',
                    price: 1400,
                    size: 126,
                    rooms: 3,
                    geolocation: {lat: 38.3251, lng: 27.1225},
                    rName: "Kemal Deniz",
                    isRented: false,
                  }
            ],
            loading: false,
          });
        });

    })

    describe("ApartmentList Fails", () => {
        it("an APARTMENT LIST action fails for list", () => {
            const failApartmentListAction = {
                type: APARTMENT_LIST_FAIL,
                listId: "fail",
                payload: []
            };
            expect(apartmentListReducer(defaultState, failApartmentListAction)).toEqual({
                ...defaultState,
                "apartments": Array [{}],
                error:[],
                loading: false, 
            });
        });
    });


    const defaultState2={
        apartment:{},
        loading: undefined
    }

    describe("ApartmentDetails Reducer", () => {
        it("returns initial state", () => {
          expect(apartmentDetailsReducer(undefined, {})).toEqual(defaultState2);
        });
      
        describe("ApartmentDetails Sends Request", () => {
            it("an APARTMENT DETAILS action sends request for list", () => {
              const requestApartmentDetailsAction = {
                type: APARTMENT_DETAILS_REQUEST,
                detailsId: "request",
                payload: []
              };
              expect(apartmentDetailsReducer(defaultState2, requestApartmentDetailsAction)).toEqual({
                ...defaultState2,
                apartment: {},
                loading: true, 
              });
          });
          });
    })

    describe("ApartmentDetails Shows", () => {
        it("an APARTMENT DETAILS action gets apartment details", () => {
          const successApartmentDetailsAction = {
            type: APARTMENT_DETAILS_SUCCESS,
            detailsId: "success",
            payload: 
              {
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
          };
          expect(apartmentDetailsReducer(defaultState2, successApartmentDetailsAction)).toEqual({
            ...defaultState2,
            "apartment":  {
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
            loading: false,
          });
        });

    })
    describe("ApartmentDetails Fails", () => {
        it("an APARTMENT DETAILS action fails for details", () => {
            const failApartmentDetailsAction = {
                type: APARTMENT_DETAILS_FAIL,
                detailsId: "fail",
                payload: [{}]
            };
            expect(apartmentDetailsReducer(defaultState2, failApartmentDetailsAction)).toEqual({
                error:[{}],
                loading: false, 
            });
        });
    });


})
