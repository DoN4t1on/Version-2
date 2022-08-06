import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';



import { NavbarBottom } from "./NavbarBottom";


const IOSSwitch = styled((props) => (
	<Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
	width: 42,
	height: 26,
	padding: 0,
	'& .MuiSwitch-switchBase': {
		padding: 0,
		margin: 2,
		transitionDuration: '300ms',
		'&.Mui-checked': {
			transform: 'translateX(16px)',
			color: '#fff',
			'& + .MuiSwitch-track': {
				backgroundColor: theme.palette.mode === 'dark' ? '#28a745' : '#28a745',
				opacity: 1,
				border: 0,
			},
			'&.Mui-disabled + .MuiSwitch-track': {
				opacity: 0.5,
			},
		},
		'&.Mui-focusVisible .MuiSwitch-thumb': {
			color: '#28a745',
			border: '6px solid #fff',
		},
		'&.Mui-disabled .MuiSwitch-thumb': {
			color:
				theme.palette.mode === 'light'
					? theme.palette.grey[100]
					: theme.palette.grey[600],
		},
		'&.Mui-disabled + .MuiSwitch-track': {
			opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
		},
	},
	'& .MuiSwitch-thumb': {
		boxSizing: 'border-box',
		width: 22,
		height: 22,
	},
	'& .MuiSwitch-track': {
		borderRadius: 26 / 2,
		backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
		opacity: 1,
		transition: theme.transitions.create(['background-color'], {
			duration: 500,
		}),
	},
}));

export const Notificationsettings = () => {



	return (
    <div>
      <div className='casual-header-div'>
        <h4 className='headline'>Benachrichtigungseinstellungen</h4>
      </div>

      <div className='casual-menu  '>
        <div>
          <div className='notification-setting'>
            <p className='text-align-left'>
              <strong>Neue Petitionen in deiner Nähe:</strong>
            </p>
            <IOSSwitch className='switch' sx={{ m: 1 }} defaultChecked />
          </div>
          <div className='notification-setting'>
            <p className='text-align-left'>
              <strong>Neue Crowdfundingkampagnen in deiner Nähe:</strong>
            </p>
            <IOSSwitch
              className='switch-special'
              sx={{ m: 1 }}
              defaultChecked
            />
          </div>

          <div className='horzontal-rule-general'>
            <hr />
          </div>
          <br />

          <h3>
            <strong>Erstellte Petitionen: </strong>
          </h3>
          <br />
          <div className='notification-setting'>
            <p className='text-align-left'>
              <strong>Spendenzusagen:</strong>
            </p>
            <IOSSwitch className='switch' sx={{ m: 1 }} defaultChecked />
          </div>

          <div className='notification-setting'>
            <p className='text-align-left'>
              <strong>Abstimmungen:</strong>
            </p>
            <IOSSwitch className='switch' sx={{ m: 1 }} defaultChecked />
          </div>

          <div className='notification-setting'>
            <p className='text-align-left'>
              <strong>Kommentare:</strong>
            </p>
            <IOSSwitch className='switch' sx={{ m: 1 }} defaultChecked />
          </div>
          <div className='notification-setting'>
            <p className='text-align-left'>
              <strong>Petitionen angenommen oder abgelehnt:</strong>
            </p>
            <IOSSwitch
              className='switch-special'
              sx={{ m: 1 }}
              defaultChecked
            />
          </div>
          <br />
          <div className='horzontal-rule-general'>
            <hr />
          </div>
          <br />
          <h3>
            <strong>Markierte Petitionen: </strong>
          </h3>
          <br />
          <div className='notification-setting'>
            <p className='text-align-left'>
              <strong>Kommentare:</strong>
            </p>
            <IOSSwitch className='switch' sx={{ m: 1 }} defaultChecked />
          </div>
          <div className='notification-setting'>
            <p className='text-align-left'>
              <strong>Spendenzusagen:</strong>
            </p>
            <IOSSwitch className='switch' sx={{ m: 1 }} defaultChecked />
          </div>

          <div className='notification-setting'>
            <p className='text-align-left'>
              <strong>Abstimmungen:</strong>
            </p>
            <IOSSwitch className='switch' sx={{ m: 1 }} defaultChecked />
          </div>
          <div className='notification-setting'>
            <p className='text-align-left'>
              <strong>Petitionen angenommen oder abgelehnt:</strong>
            </p>
            <IOSSwitch
              className='switch-special'
              sx={{ m: 1 }}
              defaultChecked
            />
          </div>
          <br />
          <div className='horzontal-rule-general'>
            <hr />
          </div>
          <br />
          <h3>
            <strong>Unterstützte Petitionen: </strong>
          </h3>
          <br />

          <div className='notification-setting'>
            <p className='text-align-left'>
              <strong>Spendenzusagen:</strong>
            </p>
            <IOSSwitch className='switch' sx={{ m: 1 }} defaultChecked />
          </div>
          <div className='notification-setting'>
            <p className='text-align-left'>
              <strong>Abstimmungen:</strong>
            </p>
            <IOSSwitch className='switch' sx={{ m: 1 }} defaultChecked />
          </div>

          <div className='notification-setting'>
            <p className='text-align-left'>
              <strong>Kommentare:</strong>
            </p>
            <IOSSwitch className='switch' sx={{ m: 1 }} defaultChecked />
          </div>

          <div className='notification-setting'>
            <p className='text-align-left'>
              <strong>Petitionen angenommen oder abgelehnt:</strong>
            </p>
            <IOSSwitch
              className='switch-special'
              sx={{ m: 1 }}
              defaultChecked
            />
          </div>
          <br />
          <div className='horzontal-rule-general'>
            <hr />
          </div>
          <br />
          <h3>
            <strong>Markierte Crowdfundingkampagnen: </strong>
          </h3>
          <br />

          <div className='notification-setting'>
            <p className='text-align-left'>
              <strong>Spenden:</strong>
            </p>
            <IOSSwitch className='switch' sx={{ m: 1 }} defaultChecked />
          </div>

          <div className='notification-setting'>
            <p className='text-align-left'>
              <strong>Crowdfunding erfolgreich:</strong>
            </p>
            <IOSSwitch className='switch' sx={{ m: 1 }} defaultChecked />
          </div>
          <br />
          <div className='horzontal-rule-general'>
            <hr />
          </div>
          <br />
          <h3>
            <strong>Unterstützte Crowdfundingkampagnen: </strong>
          </h3>
          <br />

          <div className='notification-setting'>
            <p className='text-align-left'>
              <strong>Spenden:</strong>
            </p>
            <IOSSwitch className='switch' sx={{ m: 1 }} defaultChecked />
          </div>

          <div className='notification-setting'>
            <p className='text-align-left'>
              <strong>Crowdfunding erfolgreich:</strong>
            </p>
            <IOSSwitch className='switch' sx={{ m: 1 }} defaultChecked />
          </div>
        </div>
      </div>
      <NavbarBottom
        classstart='under-navitem-unselected'
        classsearch='under-navitem-unselected'
        classactivity='under-navitem-selected'
        classprofile='under-navitem-unselected'
      />
    </div>
  );

}