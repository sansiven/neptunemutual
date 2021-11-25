import Image from "next/image";
import Neptune from "/public/neptune.png";

const Converter = ({nep, nepref, busd, showModal, handleChange}) => {
    return (
        <div className="container content">
            <Image src={Neptune} />
            <h1 className="h3 mb-3 font-weight-normal">
                Enter NEP or BUSD for conversion
            </h1>
            <label htmlFor="nep" className="label">
                Nep
            </label>
            <input
                type="text"
                id="nep"
                className="form-control"
                placeholder="Nep"
                autoFocus
                value={nep}
                onChange={(e) => handleChange(e)}
                ref={nepref}
            />
            <label htmlFor="nep" className="label">
                BUSD
            </label>
            <input
                type="text"
                id="busd"
                className="form-control"
                placeholder="BUSD"
                value={busd}
                onChange={(e) => handleChange(e)}
            />
            <button
                className="btn btn-lg btn-primary btn-block button-color"
                onClick={showModal}
            >
                Wallet Details
            </button>
        </div>
    );
};

export default Converter;
