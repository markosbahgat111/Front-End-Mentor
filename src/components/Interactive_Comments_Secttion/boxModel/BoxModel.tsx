import React from "react";
import  "./style.scss";

interface Props extends React.HTMLProps<HTMLAllCollection> {
    showModel:boolean,
    setShowModel:(showModel:boolean) => void
}

const BoxModel: React.FC<Props> = ({ showModel, setShowModel }) => {

    const CloseBtn = () => {
        setShowModel(false);
    };
    const sendBtn = () => {
        setShowModel(false);
    };
    return (
        <section className="section" id={`${showModel && "show"}`}>
            <div className="popup_outer">
                <div className="popup_box">
                    <i id="close" className="fas fa-close" onClick={CloseBtn}/>
                    <h1>Delete Comment</h1>
                    <p>Are you sure you want to delete this comment? This will remove the comment and can''t be undone</p>
                    <div style={{ width: "85%" }}>Fuck you</div>
                    <div className="button">
                        <button className="clear" onClick={sendBtn}>
                            NO, CANCEL
                        </button>
                        <button className="send" onClick={sendBtn} type="submit">
                            YES, DELETE
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BoxModel;