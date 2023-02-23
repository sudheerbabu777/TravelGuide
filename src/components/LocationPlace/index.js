import {Header, Description, Image, ItemContainer} from './styledComponents'
import './index.css'

const LocationPlace = props => {
  const {placeDetails} = props
  const {imageUrl, name, description} = placeDetails

  return (
    <li className="item">
      <Image src={imageUrl} alt={name} className="image" />
      <ItemContainer>
        <Header className="name">{name}</Header>
        <Description>{description}</Description>
      </ItemContainer>
    </li>
  )
}

export default LocationPlace
