//import Modal  from "./components/Modal";
import { Modal, Button, ListGroupItem } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";

const ModalForWallet = ({
    isOpen,
    hideModal,
    account,
    chainId,
    balance,
    connect,
    disconnect,
    errorType,
}) => {
    return (
        <Modal show={isOpen} onHide={hideModal}>
            <Modal.Header>
                <b style={{color:"green"}}>Wallet Details</b>{" "}
                <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={hideModal}
                >
                    <span aria-hidden="true">×</span>
                </button>
            </Modal.Header>
            <Modal.Body>
                {account === undefined ? (
                    <>
                        <p style={{"color":"red"}}>Wallet not Connected. Please click connect below.</p>
                        {errorType ? (
                            <p style={{"color":"red"}}>
                                Unsupported Chain Id. Change your network on metamask and please connect again.
                            </p>
                        ) : null}
                    </>
                ) : (
                    <ListGroup>
                        <ListGroupItem>
                            <b>Account Id:</b> <span>{account.substr(0,5).concat('....').concat(account.substr(account.length-5,5))}</span>
                        </ListGroupItem>
                        <ListGroupItem>
                            <b>Chain Id:</b> <span>{chainId}</span>
                        </ListGroupItem>
                        <ListGroupItem>
                            <b>Balance: </b> <span>{balance}</span>
                        </ListGroupItem>
                    </ListGroup>
                )}
            </Modal.Body>
            <Modal.Footer>
                {account === undefined ? (
                    <Button className="button-color" onClick={connect}>Connect</Button>
                ) : (
                    <Button className="button-color" onClick={disconnect}>Disconnect</Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default ModalForWallet;
