import React, {useState} from "react";
import {useForm, Controller} from "react-hook-form";
import Sections from "../components/Sections"
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

const IndexPage = () => {

    // States

    const [formStep, setFormStep] = useState(0)
    const {watch, register, formState: {errors, isValid}, control} = useForm({mode: "all"});
    const completeFormStep = () => {
        setFormStep(current => current + 1)
    }

    // Calculs

    const data = watch();
    const calcHomme = (((data.beer * 250 * 0.05) + (data.alcool * 30 * 0.40) + (data.whine * 100 * 0.12) + (data.cocktail * 30 * 0.40)) * 0.8 / (0.68 * data.weight)).toFixed(2);
    const calcFemme = (((data.beer * 250 * 0.05) + (data.alcool * 30 * 0.40) + (data.whine * 100 * 0.12) + (data.cocktail * 30 * 0.40)) * 0.8 / (0.55 * data.weight)).toFixed(2);
    const elemHomme = ((calcHomme - 0.50) / 0.125).toFixed(2);
    const elemFemme = ((calcFemme - 0.50) / 0.0925).toFixed(2);

    const renderButton = () => {
        if (formStep > 4) {
            return undefined
        } else {
            return (
                <button
                    disabled={!isValid}
                    onClick={completeFormStep}
                    type="button"
                    className="mt-6 bg-blue-600 text-white rounded px-8 py-6 w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Next Step
                </button>
            )
        }
    }
    return (
        <div className="min-h-screen bg-blue-900 flex flex-col items-start text-gray-900 antialiased relative">
            <div
                style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 80%, 0% 100%)",
                    height: "34rem",
                }}
                className="absolute bg-blue-800 inset-x-0 top-0"
            ></div>
            <div className="max-w-xl w-full mt-24 mb-24 rounded-lg shadow-2xl bg-white mx-auto overflow-hidden z-10">
                <div className="px-16 py-10">
                    <form>
                        {formStep >= 0 && (
                            <Sections type="text" id="username" placeholder="Prénom" htmlFor="username" title="Identité"
                                      name="prénom"
                                      formStep={formStep === 0 ? "block" : "hidden"} register={{
                                ...register("username", {
                                    required: {
                                        value: true,
                                        message: "Veuillez renseigner votre prénom"
                                    }
                                })
                            }} message={errors.username}/>
                        )}
                        {formStep >= 1 && (
                            <section className={formStep === 1 ? "block" : "hidden"}>
                                <h2 className="font-semibold text-3xl mb-8">Identité</h2>
                                <label htmlFor="genre">Genre</label>
                                <select {...register("genre", {
                                    required: {
                                        value: true,
                                        message: "Veuillez renseigner votre genre"
                                    }
                                })}>
                                    <option value="Homme">Homme</option>
                                    <option value="Femme">Femme</option>
                                </select>
                                {errors.genre && <p className="text-red-600 text-sm mt-2">{errors.genre.message}</p>}
                            </section>)}
                        {formStep >= 2 && (
                            <Sections type="number" id="weight" placeholder="Poids en kg" htmlFor="weight" title="Poids" name="weight"
                                      formStep={formStep === 2 ? "block" : "hidden"} register={{
                                ...register("weight", {
                                    required: {
                                        value: true,
                                        message: "Veuillez renseigner votre poids"
                                    }
                                })
                            }} message={errors.weight}/>
                        )}
                        {formStep >= 3 && (
                            <section className={formStep === 3 ? "block" : "hidden"}>
                                <h2 className="font-semibold text-3xl mb-8">Combien de verres avez-vous bu ?</h2>
                                <input type="number"
                                       placeholder="Demi de bière 25cl" {...register("beer", {
                                    required: true,
                                    min: 0
                                })} />
                                <input type="number"
                                       placeholder="Verre d'alcool fort 2.5 cl" {...register("alcool", {
                                    required: true,
                                    min: 0
                                })} />
                                <input type="number"
                                       placeholder="Verre de vin 10cl" {...register("whine", {
                                    required: true,
                                    min: 0
                                })} />
                                <input type="number"
                                       placeholder="Cocktail avec 2,5cl d'alcool" {...register("cocktail", {
                                    required: true,
                                    min: 0
                                })} />
                            </section>
                        )}
                        {formStep >= 4 && (
                            <section className={formStep === 4 ? "block" : "hidden"}>
                                <Controller {...register("time", {required: true})} control={control} defaultValue={null}
                                            render={({field}) => (
                                                <TimePicker placeholder="A quelle heure ?" showSecond={false} onChange={(e) => field.onChange(e)}/>
                                            )}/>
                            </section>)}
                        {formStep === 5 && (
                            <section className={formStep === 5 ? "block" : "hidden"}>
                                {data.genre === "Homme" && (
                                    <div>
                                        <h2 className="font-semibold text-3xl mb-8">Résultats !</h2>
                                        <span>{calcHomme} g/L</span>
                                        {calcHomme < "0.5" && (
                                            <p> Ton taux d'alcoolémie est inférieur à 0,5 g/l
                                                Bravo {data.username}, tu as été raisonnable.
                                                Tu peux rentrer sereinement</p>
                                        )}
                                        {calcHomme >= "0.5" && calcHomme <= "1" && (
                                            <p> Tu as trop bu {data.username} !
                                                Il va falloir appeler un taxi ou patienter {elemHomme}h.</p>
                                        )}
                                        {calcHomme > "1" && calcHomme < "2" && (
                                            <p> Tu devrais boire beaucoup moins {data.username} !
                                                Il va falloir appeler un taxi ou patienter {elemHomme}h.</p>
                                        )}
                                        {calcHomme > "2" && calcHomme < "3" && (
                                            <p> Tu es totalement ivre {data.username} !
                                                Appelles un ami ou dors sur place !</p>
                                        )}
                                        {calcHomme > "3" && calcHomme < "5" && (
                                            <p> Tu es au bord du coma éthylique ivre {data.username} !
                                                Appelles les urgences </p>
                                        )}
                                        {calcHomme > "5" && (
                                            <p> RIP {data.username} </p>
                                        )}
                                    </div>
                                )}
                                {data.genre === "Femme" && (
                                    <div>
                                        <h2 className="font-semibold text-3xl mb-8">Résultats !</h2>
                                        <span>{calcFemme} g/L</span>
                                        {calcFemme < "0.5" && (
                                            <p> Ton taux d'alcoolémie est inférieur à 0,5 g/l
                                                Bravo {data.username}, tu as été raisonnable
                                                Tu peux rentrer sereinement</p>
                                        )}
                                        {calcFemme >= "0.5" && calcFemme <= "1" && (
                                            <p> Tu as trop bu {data.username} !
                                                Il va falloir appeler un taxi ou patienter {elemFemme}h.</p>
                                        )}
                                        {calcFemme > "1" && calcFemme < "2" && (
                                            <p> Tu devrais boire beaucoup moins {data.username} !
                                                Il va falloir appeler un taxi ou patienter {elemFemme}h.</p>
                                        )}
                                        {calcFemme > "2" && calcFemme < "3" && (
                                            <p> Tu es totalement ivre {data.username} !
                                                Appelles un ami ou dors sur place !</p>
                                        )}
                                        {calcFemme > "3" && calcFemme < "5" && (
                                            <p> Tu es au bord du coma éthylique ivre {data.username} !
                                                Appelles les urgences </p>
                                        )}
                                        {calcFemme > "5" && (
                                            <p> RIP {data.username} </p>
                                        )}
                                    </div>
                                )}
                            </section>
                        )}
                        {renderButton()}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default IndexPage
