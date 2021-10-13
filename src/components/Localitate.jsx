import { Tooltip } from '@chakra-ui/tooltip';

const Localitate = ({
  className,
  fill,
  onClick,
  transform,
  d,
  strokeWidth,
}) => {
  return fill === 'red' ? (
    <Tooltip label={className} placement="top" defaultIsOpen>
      <path
        className={className}
        fill={fill}
        onClick={onClick}
        transform={transform}
        d={d}
        stroke-width={strokeWidth}
      />
    </Tooltip>
  ) : (
    <path
      className={className}
      fill={fill}
      onClick={onClick}
      transform={transform}
      d={d}
      stroke-width={strokeWidth}
    />
  );
};

export default Localitate;
