import React from "react";
import { Modal, Button } from "react-bootstrap";
import { setLocation } from "@/slices/locationSlice";
import { initializeHours } from "@/app/utils/menuUtils";
import { RootState } from "@/lib/store";
import { LocationData } from "@/app/interfaces";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/lib/hooks";

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
        <Modal.Title>Select Location</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-2 flex flex-col">
          <div className="d-flex justify-content-around">
            {locationState.locations.map(
              (location: LocationData, index: number) => {
                return (
                  <button
                    key={index}
                    id="buttonParent"
                    className="red"
                    onClick={() => handleLocationSelect(location.location_id)}
                  >
                    <div className="d-flex align-items-center justify-content-center p-2">
                      {location.location_name}
                    </div>
                  </button>
                );
              }
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LocationPopup;
