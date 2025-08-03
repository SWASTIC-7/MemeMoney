import React from 'react'
import './createForm.css';
function createForm() {
  return (
    <div className="createFormContainer">
        <div className="createForm">
            <h1 className='Halo'>CREATE</h1>
            <form>
                <label>
                    TOKEN NAME:
                    <input type="text" name="tokenName" />
                </label>
                <br />
                <label>
                    SYMPOL:
                    <input type="text" name="symbol" />
                </label>
                <br />
                <label>
                    TOTAL SUPPLY:
                    <input type="number" name="totalSupply" />
                </label>
                <br />
                <button className='submit_btn' type="submit">CREATE COIN</button>
                <button className='deploy_btn' type="submit">DEPLOY</button>
            </form>
        </div>
    </div>
  )
}

export default createForm