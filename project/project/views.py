# -*- coding: utf-8 -*-

from django.template.loader import get_template
from django import template
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.views import APIView

from account.models import Group
from online_judge.models import ScoreRecord


# def Rank(request):
# 	return render(request,'index.html')

class Rank(APIView):

    template = 'index.html'

    def get(self, request):
        return render(request, Rank.template)

# class RankList(APIView):

#     def get(self, request):
        
#         top_score_list_for_groups  = []
#         for group in Group.objects.all():
#             score_record_of_group = ScoreRecord.objects.filter(group=group)
#             top_nmi_record = score_record_of_group.order_by('-nmi').first()
#             top_anc_record = score_record_of_group.order_by('-anc').first()
#             top_score_list_for_groups.append(
#                     {
#                         "group": group.name,
#                         "details" : {
#                             "nmi": top_nmi_record.serialize(), 
#                             "anc": top_anc_record.serialize()
#                         }
#                     }
#                 )
            
#         # TODO sort top_score_list_for_groups
#         return Response(top_score_list_for_groups, status=status.HTTP_200_OK)
