import React from 'react';

const Sections = (props) => {
    return (
        <div>
            <section className={props.formStep}>
                <h2 className="font-semibold text-3xl mb-8">
                    {props.title}
                </h2>
                <label htmlFor={props.htmlFor}>{props.placeholder}</label>
                <input id={props.id} type={props.type} placeholder={props.placeholder}
                       className="text-input" {...props.register} />
                {props.message &&
                    <p className="text-red-600 text-sm mt-2">{props.message.message}</p>}
            </section>
        </div>
    );
};

export default Sections;
