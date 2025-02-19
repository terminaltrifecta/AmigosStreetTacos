import React from "react";
import { Modal, Button } from "react-bootstrap";
import { setLocation } from "@/slices/locationSlice";
import { initializeHours } from "@/app/utils/menuUtils";
import { RootState } from "@/lib/store";
import { LocationData } from "@/app/interfaces";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/lib/hooks";
import { MapPin } from "iconoir-react";

interface LocationPopupProps {
  show: boolean;
  onClose: () => void;
}

const LocationPopup: React.FC<LocationPopupProps> = ({ show, onClose }) => {
  const dispatch = useDispatch();
  const locationState = useAppSelector((state: RootState) => state.location);

  const handleLocationSelect = (location: number) => {
    dispatch(setLocation(location));
    initializeHours(dispatch, locationState.locations, location);
    onClose();
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      backdrop="static" // Prevent closing by clicking outside
      keyboard={false} // Prevent closing by pressing the "Escape" key
      centered
    >
      <Modal.Header>
        <div className="font-bold text-2xl text-center w-full">Select Location</div>
        <MapPin className="cart" width={32} height={32} strokeWidth={2} />
        
      </Modal.Header>
      <Modal.Body>
          <div className="flex flex-col space-y-2">
            {locationState.locations.map(
              (location: LocationData, index: number) => {
                return (
                  <button
                    key={index}
                    id="buttonParent"
                    className="red"
                    onClick={() => handleLocationSelect(location.location_id)}
                  >
                    <div className="align-items-center justify-content-center p-2 text-sm lg:text-lg">
                      {location.location_name}
                    </div>
                  </button>
                );
              }
            )}
          </div>
      </Modal.Body>
    </Modal>
  );
};

export default LocationPopup;
