import { Tooltip } from '@material-ui/core';
import React, { useState } from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard';

const Copy = (props) => {

  const {text} = props
  const [copied, setCopied] = useState(false)

  return (
    <CopyToClipboard text={text} onCopy={()=> setCopied(true)}>
        <Tooltip arrow title={copied?'Copied':'Copy'}>
           <span className='copy'>{text}</span>
        </Tooltip>
    </CopyToClipboard>
  )
}
export default Copy