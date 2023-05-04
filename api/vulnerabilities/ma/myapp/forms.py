from django import forms
from myapp.models import User

class UserForm(forms.ModelForm):
    
    class Meta:
        model = User
        #fields = ['username', 'password']
        #exclude = ['is_admin']
        fields = '__all__'
        widgets = {
            'password': forms.PasswordInput(),
        }
    