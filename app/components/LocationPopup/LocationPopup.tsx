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

  const handleLocationSelect = (location: string) => {
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
        <Modal.Title>Select Your Location</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Please select the location you're ordering for:</p>
        <div className="d-flex justify-content-around">
          <Button
            variant="primary"
            onClick={() => handleLocationSelect("seventeen")}
          >
            Seventeen
          </Button>
          <Button
            variant="primary"
            onClick={() => handleLocationSelect("fourteen")}
          >
            Fourteen
          </Button>
          <Button
            variant="primary"
            onClick={() => handleLocationSelect("clair")}
          >
            Clair
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LocationPopup;
