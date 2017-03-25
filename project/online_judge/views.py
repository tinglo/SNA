import datetime

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.shortcuts import render

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from account.models import Group
from .models import ScoreRecord


from rest_framework.authentication import SessionAuthentication 
class CsrfExemptSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request):
        return  # To not perform the csrf check previously happening


class Rank(APIView):

    template = 'rank.html'

    def get(self, request):
        return render(request, Rank.template)


class RankList(APIView):

    def get(self, request):
        
        top_score_list_for_groups  = []
        for group in Group.objects.all():
            top_score = ScoreRecord.objects.filter(group=group).order_by('nmi').first()
            top_score_list_for_groups.append(top_score.serialize())
            
        # TODO sort top_score_list_for_groups
        return Response(top_score_list_for_groups, status=status.HTTP_200_OK)


class Upload(APIView):
    
    authentication_classes = (CsrfExemptSessionAuthentication,)
    template = 'upload.html'
    

    def store_file_in_local(self, uploaded_file, path):
        with open(path, 'wb+') as destination:
            for chunk in uploaded_file.chunks():
                destination.write(chunk)

    def evaluate(self, filepath):
        """ This method is used to evalute the score of uploaded file 
        
        It should return the scores
        """

        with open(filepath, 'r') as fd:
            for line in fd:
                print(line, end="")
        

        # TODO evaluate the record and it's score
         
        # store score record
        score_record = ScoreRecord()
        score_record.nmi = 98.7
        score_record.anc = 89.9

        return score_record  

    def get(self, request):
        return render(request, Upload.template)

    def post(self, request):
        """處理上傳的檔案，並且計算分數
        """
        if not request.user.is_authenticated():
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        uploaded_file = request.FILES.get('result', None)
        if uploaded_file is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        # Determine Filename
        # TODO implement serial number for each group
        # filename: {date}-{serial}-{name}
        today = datetime.datetime.today()
        filename = '{date}-{name}'.format(
                date=today.strftime("%Y-%m-%d"),
                name=uploaded_file.name
        )
        filepath = './file/{group}/{filename}'.format(
            group=request.user.account_group.name,
            filename=filename
        )
        
        # Store file
        self.store_file_in_local(uploaded_file, filepath)
        score_record = self.evaluate(filepath)
        
        score_record.user = request.user
        score_record.group = request.user.account_group
        score_record.filename = filename
        score_record.save()
        
        return Response(score_record.serialize(), status=status.HTTP_200_OK)
