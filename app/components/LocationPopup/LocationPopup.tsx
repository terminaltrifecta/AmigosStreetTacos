import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useAppDispatch } from "@/lib/hooks";
import { setLocation } from "@/slices/locationSlice";

interface LocationPopupProps {
  show: boolean;
  onClose: () => void;
}

const LocationPopup: React.FC<LocationPopupProps> = ({ show, onClose }) => {
  const dispatch = useAppDispatch();

  const handleLocationSelect = (location: number) => {
    dispatch(setLocation(location));
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
          <div className="font-light text-sm">
            Note: Only 17 Mile is available for online ordering at the moment!
          </div>
          <div className="d-flex justify-content-around">
            <button
              id="buttonParent"
              className="red"
            onClick={() => handleLocationSelect(2)}
            >
              <div className="d-flex align-items-center justify-content-center p-2">
                17 Mile Rd
              </div>
            </button>

            {/* <button id="buttonParent" className="red" onClick={() => handleLocationSelect(1)}>
            <div className="d-flex align-items-center justify-content-center p-2">
              14 Mile Rd
            </div>
          </button>

          <button id="buttonParent" className="red" onClick={() => handleLocationSelect(2)}>
            <div className="d-flex align-items-center justify-content-center p-2">
              St Clair Shores
            </div>
          </button> */}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LocationPopup;
